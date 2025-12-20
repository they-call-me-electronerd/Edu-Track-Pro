<div align="center">

# EDU TRACK PRO
## USER MANUAL & DOCUMENTATION
### Version 2.0

![Edu Track Pro Logo](../assets/img/logo.png)

**Live Portal:** [edutrackpro.gt.tc](http://edutrackpro.gt.tc)

---

</div>

## 1. Introduction

**EduTrack Pro** is a state-of-the-art IoT-based attendance management system. It replaces traditional paper attendance with instant, secure, and automated RFID tracking.

### Key Features
*   **Instant Check-in/Out**: Just tap your card.
*   **Real-time Dashboard**: View attendance as it happens.
*   **Smart Indicators**: Visual (LED) and Audio (Buzzer) feedback.
*   **Cloud Connectivity**: Data is instantly synced to the cloud.
*   **Responsive Web Portal**: Access from any phone, tablet, or computer.

---

## 2. Hardware Setup

### Device Overview
Your EduTrack Pro device consists of:
1.  **RFID Reader**: The flat pad where you tap your card.
2.  **LCD Screen**: Displays status, messages, and user names.
3.  **Status LED**: Lights up to indicate activity.
4.  **Buzzer**: Beeps for successful scans or alerts.
5.  **Control Button**: Used for resetting WiFi settings.

### Powering On
1.  Connect the device to a power source using the provided USB cable.
2.  The LCD screen will light up and display the "EduTrack Pro" welcome message.
3.  The device will beep twice to indicate it is ready.

---

## 3. WiFi Configuration (First Time Setup)

If the device cannot connect to WiFi, it will enter **Configuration Mode**. Follow these steps to connect it to your internet:

1.  **Wait for "WiFi Failed"**: The LCD will display "WiFi Failed" followed by "Open AP".
2.  **Connect to Hotspot**:
    *   On your phone or laptop, search for available WiFi networks.
    *   Connect to the network named **"EduTrackPro"**.
3.  **Open Configuration Portal**:
    *   Once connected, a "Sign in to network" popup should appear.
    *   If not, open your browser and go to `192.168.4.1`.
4.  **Enter Credentials**:
    *   Click "Configure WiFi".
    *   Select your home/school WiFi network from the list.
    *   Enter your WiFi password.
    *   Click "Save".
5.  **Reboot**: The device will automatically restart and connect to the internet.

> **Note**: To force WiFi reconfiguration later, press and hold the **Flash Button** (D3) for 3 seconds until "Config Portal" appears.

---

## 4. Using the System (For Students)

### How to Mark Attendance
1.  Wait for the LCD to show **"Scan your Tag"**.
2.  Place your RFID card near the reader (within 2-3 cm).
3.  **Listen for the Beep**:
    *   **Double Beep (Short)**: ✅ Success! You are marked **IN** or **OUT**.
    *   **Long Beep**: ❌ Error or Already Scanned.
4.  **Check the Screen**: It will display your name and "Present".

### Checking Your Attendance Online
1.  Go to [edutrackpro.gt.tc](http://edutrackpro.gt.tc/student-dashboard.html).
2.  **Login**:
    *   **Roll Number**: Enter your assigned roll number (e.g., `87638915`).
    *   **Password**: Enter your password (default: `student123`).
3.  **Dashboard**:
    *   View your monthly attendance calendar.
    *   Green dates = Present.
    *   Red dates = Absent.

---

## 5. Using the System (For Admins)

### accessing the Admin Dashboard
1.  Go to [edutrackpro.gt.tc/admin-dashboard.html](http://edutrackpro.gt.tc/admin-dashboard.html).
2.  **Login**:
    *   **Username**: `admin`
    *   **Password**: `admin123` (Change this immediately for security!).

### Managing Students
*   **Add Student**: Click "Add Student", fill in details, and assign an RFID UID.
*   **Edit/Delete**: Find the student in the list and use the Action buttons.

### Generating Reports
*   Click **"Export CSV"** to download a spreadsheet of all attendance records.
*   Use the date filters to see attendance for specific days or months.

---

## 6. Troubleshooting

| Issue | Possible Cause | Solution |
| :--- | :--- | :--- |
| **"WiFi Failed" on Screen** | Incorrect Password or Signal Weak | Reconfigure WiFi (See Section 3) or move closer to router. |
| **Card Not Reading** | Card damaged or wrong type | Try a different card. Ensure it is a MIFARE 13.56MHz tag. |
| **"Server Error" on Screen** | Internet down or Server offline | Check internet connection. Verify `edutrackpro.gt.tc` is accessible. |
| **Login Failed** | Wrong password | Contact Administrator to reset password. |
| **Device Stuck** | Software glitch | Unplug the USB power and plug it back in (Power Cycle). |

---

## 7. Support

For technical assistance, please contact the IT department or system administrators:

*   **Hardware Support**: Sakshyam Bastakoti
*   **Software Support**: Zenith Kandel
*   **Email**: support@edutrackpro.gt.tc

---

*© 2025 Edu Track Pro. All Rights Reserved.*
