/*
  EduTrack Pro - NodeMCU Attendance System (Enhanced UX Version)
  Author : Sakshyam Bastakoti & Zenith Kandel
  Date   : 2025-12-02

  Enhanced UX Features:
  - Professional welcome screens
  - Clear guided LCD messages
  - Distinct buzzer tones for each state
  - Human-friendly wording
  - Exhibition-ready flow
*/

#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <WiFiManager.h>
#include <SPI.h>
#include <MFRC522.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>

// ---------- LCD ----------
LiquidCrystal_I2C lcd(0x27, 16, 2);

// ---------- PINS ----------
#define RST_PIN     255
#define SS_PIN      2     // D4
#define BUZZER      16    // D0
#define LED         15    // D8
#define BUTTON_PIN  0     // D3
#define WIFI_LED    LED_BUILTIN

// ---------- SERVER ----------
const char* serverHost  = "edutrackpro.zenithkandel.com.np";
const int   serverPort  = 80;
const char* apiEndpoint = "/API/rfid-checkin.php";

WiFiClient wifiClient;
HTTPClient http;
MFRC522 mfrc522(SS_PIN, RST_PIN);

// ---------- TIMING ----------
const unsigned long COOLDOWN_DELAY = 1500;
unsigned long lastScanTime = 0;
unsigned long pressStart = 0;
bool readyDisplayed = false;

// ---------- BUZZER TONES ----------
// void beepShort() {
//   digitalWrite(BUZZER, HIGH); delay(80); digitalWrite(BUZZER, LOW); delay(100);
// }
void beepSuccess() {
  digitalWrite(BUZZER, HIGH); delay(200); digitalWrite(BUZZER, LOW); delay(50);
}
void beepError() {
  digitalWrite(BUZZER, HIGH); delay(1000); digitalWrite(BUZZER, LOW); delay(100);
}
void beepStartup() {
  digitalWrite(BUZZER, HIGH); delay(200); digitalWrite(BUZZER, LOW); delay(100);
  digitalWrite(BUZZER, HIGH); delay(200); digitalWrite(BUZZER, LOW); delay(100);
}
void beepConfigMode() {
  digitalWrite(BUZZER, HIGH); delay(500); digitalWrite(BUZZER, LOW); delay(500);
}

// ---------- UTILS ----------
String byteToHex(byte val) {
  char buf[3];
  sprintf(buf, "%02X", val);
  return String(buf);
}

// ---------- WIFI UI ----------
void applyWiFiStyle(WiFiManager& wm) {
  const char* css = "<style>"
    "body{background-color:#1e1e1e;font-family:Verdana,sans-serif;color:#ffffff;text-align:center;}"
    "h1{color:#00d4ff;font-size:24px;margin-bottom:20px;}"
    "form{background:#2d2d2d;padding:25px;border-radius:15px;box-shadow:0 4px 15px rgba(0,0,0,0.5);display:inline-block;width:300px;text-align:left;}"
    "input{background:#383838;color:#fff;border:1px solid #555;border-radius:6px;padding:12px;width:100%;box-sizing:border-box;margin-bottom:15px;font-size:14px;}"
    "div,a,p{color:#e0e0e0 !important;text-decoration:none;}"
    "button{border:none;border-radius:25px;background:linear-gradient(90deg,#00d4ff,#005bea);color:white;padding:12px;width:100%;font-weight:bold;cursor:pointer;transition:0.3s;}"
    "button:hover{transform:translateY(-2px);box-shadow:0 5px 15px rgba(0,212,255,0.4);}"
    ".c{color:#aaa;font-size:11px;margin-top:15px;}"
    "</style>";
  wm.setCustomHeadElement(css);
}

// ---------- API ----------
bool sendToAPI(String uid) {
  String url = String("http://") + serverHost + apiEndpoint;
  String payload = "{\"uid\":\"" + uid + "\"}";
  
  if (WiFi.status() != WL_CONNECTED) return false;

  wifiClient.setTimeout(3000); // 3 Second timeout for production stability
  http.begin(wifiClient, url);
  http.addHeader("Content-Type", "application/json");
  
  int httpCode = http.POST(payload);
  http.end();
  return (httpCode == 200);
}

// ---------- SETUP ----------
void setup() {
  Serial.begin(115200);

  pinMode(LED, OUTPUT);
  pinMode(BUZZER, OUTPUT);
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  pinMode(WIFI_LED, OUTPUT);

  digitalWrite(WIFI_LED, HIGH);
  
  // Production: Disable WiFi sleep for better response & reliability
  WiFi.setSleepMode(WIFI_NONE_SLEEP);

  Wire.begin();
  lcd.init();
  lcd.backlight();
  
  // Custom Character (Arrow Down)
  byte arrowDown[8] = {0x04,0x04,0x04,0x04,0x15,0x0E,0x04,0x00};
  lcd.createChar(1, arrowDown);

  SPI.begin();
  mfrc522.PCD_Init();

  lcd.clear();
  lcd.print(F("Welcome to...."));
  lcd.setCursor(0,1); lcd.print(F("EduTrack Pro"));
  beepStartup();
  delay(1800);

  lcd.clear();
  lcd.print(F("Initializing..."));
  lcd.setCursor(0,1); lcd.print(F("Please Wait"));
  delay(1200);

  WiFiManager wm;
  applyWiFiStyle(wm); // Apply custom UI
  lcd.clear();
  lcd.print(F("WiFi Setup..."));
  if (!wm.autoConnect("EduTrackPro")) {
    lcd.clear();
    lcd.print(F("WiFi Failed"));
    lcd.setCursor(0,1); lcd.print(F("Use Config"));
    delay(2000);
  }

  lcd.clear();
  lcd.print(F("WiFi Connected"));
  lcd.setCursor(0,1); lcd.print(F("System Ready"));
  digitalWrite(WIFI_LED, LOW);
  delay(1200);

  lcd.clear();
  lcd.print(F("Scan Your ID"));
  lcd.setCursor(0,1); lcd.print(F("Place Card \x01")); // Arrow Down
  readyDisplayed = true;
}

// ---------- LOOP ----------
void loop() {
  if (WiFi.status() != WL_CONNECTED) {
    lcd.clear();
    lcd.print(F("WiFi Lost"));
    lcd.setCursor(0,1); lcd.print(F("Reconnecting"));
    digitalWrite(WIFI_LED, HIGH);
    
    // Production: Auto-restart if WiFi is down for 60s
    static unsigned long wifiLostStart = 0;
    if (wifiLostStart == 0) wifiLostStart = millis();
    if (millis() - wifiLostStart > 60000) ESP.restart();
    
    delay(1000);
    return;
  }
  // Reset counter when connected
  static unsigned long wifiLostStart = 0;

  if (digitalRead(BUTTON_PIN) == LOW) {
    if (pressStart == 0) pressStart = millis();
    if (millis() - pressStart > 3000) {
      lcd.clear();
      lcd.print(F("WiFi Config Mode"));
      lcd.setCursor(0,1); lcd.print(F("Connect to AP"));
      beepConfigMode();
      WiFiManager wm;
      applyWiFiStyle(wm); // Apply custom UI
      wm.startConfigPortal("EduTrackPro-Config");
      ESP.restart();
    }
  } else pressStart = 0;

  if (!mfrc522.PICC_IsNewCardPresent()) return;
  if (!mfrc522.PICC_ReadCardSerial()) return;

  if (millis() - lastScanTime < COOLDOWN_DELAY) return;
  lastScanTime = millis();

  
  // lcd.clear();
  // lcd.setCursor(0,0); lcd.print("Card Detected");
  // lcd.setCursor(0,1); lcd.print("Reading...");
  // delay(500); // Removed to speed up

  // LED ON indicating processing
  digitalWrite(LED, HIGH);

  String uid = "";
  for (byte i = 0; i < mfrc522.uid.size; i++) {
    uid += byteToHex(mfrc522.uid.uidByte[i]);
    if (i < mfrc522.uid.size - 1) uid += ":";
  }

  // lcd.clear();
  // lcd.setCursor(0,0); lcd.print("Marking Attend.");
  // lcd.setCursor(0,1); lcd.print("Please Wait");

  bool ok = sendToAPI(uid);

  if (ok) {
    lcd.clear();
    lcd.print(F("Present"));
    lcd.setCursor(0,1); lcd.print(uid);
    beepSuccess();
  } else {
    lcd.clear();
    lcd.print(F("Server Error"));
    lcd.setCursor(0,1); lcd.print(F("Try Again"));
    beepError();
  }

  // LED OFF after processing
  digitalWrite(LED, LOW);

  delay(300);
  lcd.clear();
  lcd.print(F("Scan Your ID"));
  lcd.setCursor(0,1); lcd.print(F("Place Card \x01")); // Arrow Down

  mfrc522.PICC_HaltA();
  mfrc522.PCD_StopCrypto1();
  digitalWrite(WIFI_LED, LOW);
}
