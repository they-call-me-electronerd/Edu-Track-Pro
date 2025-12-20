# EDU TRACK PRO - IoT-Based RFID Smart Attendance System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PHP](https://img.shields.io/badge/PHP-8.0+-777BB4?logo=php&logoColor=white)](https://www.php.net/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0+-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Arduino](https://img.shields.io/badge/Arduino-ESP8266-00979D?logo=arduino&logoColor=white)](https://www.arduino.cc/)

**[Visit Edu Track Pro Live →](https://edutrackpro.gt.tc)**       *[edutrackpro.com](https://edutrackpro.gt.tc)*

A production-ready IoT-based smart attendance management system that uses RFID technology to automate student attendance tracking with real-time analytics and comprehensive reporting. **Now updated to Version 2.0!**

## 🌟 Features

### 🔐 Dual User Roles
- **Admin Panel**: Complete system management with analytics dashboard (`admin-dashboard.html`)
- **Student Portal**: Personal attendance tracking with calendar view (`student-dashboard.html`)

### 📊 Key Capabilities
- ✅ **Real-time Check-in/Check-out**: Automatic IN/OUT detection (First scan=IN, Second=OUT, Third+=Rejected)
- ✅ **Responsive Design**: Mobile-first architecture working perfectly across phones, tablets, and desktops.
- ✅ **Interactive UI**: Dark/Light theme toggle, animated cards, and glassmorphism effects.
- ✅ **Analytics**: Interactive charts (Chart.js) and calendar-based attendance visualization.
- ✅ **Data Export**: Export reports to CSV/Excel.
- ✅ **Security**: Bcrypt password hashing, session-based auth, and input sanitization.
- ✅ **Debug Tools**: Dedicated testing pages and scripts for connection and login debugging.
- ✅ **Timezone Support**: Optimized for Nepal Time (GMT+5:45).

## 🛠️ Tech Stack

### Hardware
- **ESP8266 NodeMCU**
- **MFRC522 RFID Reader**
- **16x2 LCD Display (I2C)**
- **Active Buzzer & LED**
- **MIFARE RFID Cards/Tags**

### Software
- **Firmware**: Arduino C++ (Enhanced UX version)
- **Backend**: PHP 8.0+, MySQL/MariaDB
- **Frontend**: HTML5, CSS3, JavaScript ES6+, Chart.js
- **Server**: XAMPP (Apache + MySQL)

## 📁 Project Structure

```
Edu-Track-Pro/
├── index.html                  # Landing page
├── login.html                  # Authentication page
├── admin-dashboard.html        # Admin control panel
├── student-dashboard.html      # Student portal
├── test-rfid.html              # RFID browser simulator
├── test-login.html             # Login functionality tester
├── control-panel.html          # Legacy panel
├── SETUP-COMPLETE.md           # Detailed setup guide
├── RESPONSIVE-IMPLEMENTATION.md # Design documentation
│
├── API/                        # Backend Endpoints
│   ├── conn.php                # Database connection
│   ├── rfid-checkin.php        # Hardware I/O handler
│   ├── login.php               # Auth handler
│   ├── fetch-attendance.php    # Data retrieval
│   ├── debug-login.php         # Debugging tool
│   ├── reset-passwords.php     # Emergency password reset
│   └── ... (see API folder)
│
├── Arduino code/
│   └── edu_tack_pro.ino        # PRIMARY FIRMWARE (Enhanced UX)
│
├── css/                        # Responsive Stylesheets
├── js/                         # Logic Controllers
└── assets/                     # Images and Resources
```

## 🚀 Installation & Setup

### Prerequisites
- XAMPP (Apache + MySQL)
- Arduino IDE with ESP8266 board definitions

### Step 1: Database Setup
1. Start Apache and MySQL in XAMPP.
2. Go to `http://localhost/phpmyadmin`.
3. Create database named `edutrack`.
4. Import `edutrack.sql` (if available) or construct tables as per schema.

### Step 2: Configure API
Update `API/conn.php` with your database credentials if different from default (`root`, empty password).

### Step 3: Hardware Setup
1. Open `Arduino code/edu_tack_pro.ino`.
2. Update the `serverHost` variable (Line 36) with your PC's IP Address (e.g., `192.168.1.x`).
3. Upload to NodeMCU.
4. **Wiring Reference**:
   - **SDA**: D2 (GPIO 4)
   - **SCK**: D5 (GPIO 14)
   - **MOSI**: D7 (GPIO 13)
   - **MISO**: D6 (GPIO 12)
   - **RST**: Not Connected (255)
   - **Buzzer**: D0 (GPIO 16)
   - **LED**: D8 (GPIO 15)

### Step 4: Access System
- **Landing Page**: `http://localhost/Edu-Track-Pro/`
- **Login Debugger**: `http://localhost/Edu-Track-Pro/test-login.html`

## 🔑 Default Credentials

### Admin Login
- **URL**: `login.html`
- **Username**: `admin`
- **Password**: `admin123`

### Student Login (Sample)
- **Roll Number**: `87638915`
- **Password**: `student123`
*(See `SETUP-COMPLETE.md` for more sample accounts)*

## 📖 API Overview

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/API/rfid-checkin.php` | POST | Handles RFID scans from hardware |
| `/API/login.php` | POST | Authenticates users (Admin/Student) |
| `/API/debug-login.php` | GET | Diagnoses login issues |
| `/API/reset-passwords.php` | GET | Resets all passwords to defaults |

## 🧪 Debugging & Testing
- Use **`test-rfid.html`** to simulate RFID card scans directly in your browser.
- Use **`test-login.html`** to verify authentication logic without needing actual hardware.
- Check **`SETUP-COMPLETE.md`** for a full troubleshooting guide.

## 👥 Contributors
- **Sakshyam Bastakoti** - *Hardware Engineer*
- **Zenith Kandel** - *Software Engineer*

## 📄 License
MIT License - see `LICENSE` for details.

---
<p align="center">
  <b>Made with ❤️ by Edu Track Pro Team</b><br>
  © 2025 EDU TRACK PRO - All Rights Reserved
</p>
