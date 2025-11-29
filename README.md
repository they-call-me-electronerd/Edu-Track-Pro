# IoT RFID Attendance System - EduTrack Pro

## 🎯 Overview
EduTrack Pro is a production-ready IoT-based RFID attendance system with integrated admin and student portals. Built with ESP8266, MFRC522 RFID module, and Google Sheets backend for real-time attendance tracking.

## 📋 Features

### Admin Panel
- **Real-time Dashboard**: Live attendance statistics with auto-refresh
- **Student Management**: Complete student database with CRUD operations
- **Attendance Logs**: Detailed records with date/time filtering
- **Reports & Analytics**: Visual charts and downloadable CSV reports
- **Dark Mode**: Eye-friendly theme toggle
- **Secure Login**: Dedicated admin authentication

### Student Portal
- **Personal Dashboard**: Individual attendance records
- **Calendar View**: Interactive calendar with attendance history
- **Date Checker**: Check attendance for specific dates
- **Profile Information**: Student details (Name, Roll No, UID, Address)

### Hardware Components
- ESP8266 NodeMCU (Wi-Fi microcontroller)
- MFRC522 RFID Module (13.56MHz reader)
- 16x2 LCD Display (I2C interface)
- Buzzer & LEDs (audio-visual feedback)
- Push Button (Wi-Fi reset)
- RFID Cards/Tags

## 🚀 Getting Started

### File Structure
```
EduTrack-Pro/
├── index.html                      # Landing page
├── login.html                      # Unified login (Student & Admin)
├── student-dashboard.html          # Student portal
├── admin-dashboard-enhanced.html   # Admin dashboard
├── css/
│   ├── style.css                  # Main styles
│   ├── login.css                  # Login page styles
│   ├── student-dashboard.css      # Student styles
│   └── admin-dashboard.css        # Admin styles
├── js/
│   ├── main.js                    # Common JavaScript
│   ├── login.js                   # Login interactions
│   ├── loginHandler.js            # Authentication logic
│   ├── student-dashboard.js       # Student dashboard
│   └── admin-dashboard.js         # Admin dashboard
├── kmc_Robotics_Club.png          # Robotics club logo
├── README.md                       # This file
└── QUICKSTART.md                   # Quick start guide
```

## 🔐 Login Credentials

### Admin Access
- **Username**: `admin`
- **Password**: `admin123`
- **Access**: Full dashboard, student management, reports

### Student Access
- **Username**: Student Roll Number (from database)
- **Password**: `password` (default for all students)
- **Access**: Personal attendance calendar and records

## 📊 Google Sheets Configuration

### Spreadsheet ID
```
1S7L_hKo5LJW6bOPKvxLMkXVSiP4V1CH5rfX6xYqAhBE
```

### Sheet 1: "database"
| UID | Name | Roll No | Class | Address |
|-----|------|---------|-------|---------|

### Sheet 2: "attendance"
| Date | Time | UID | Name | Roll No | Address |
|------|------|-----|------|---------|---------|

**Date Format**: YYYY-MM-DD  
**Time Format**: HH:MM:SS

## 🎨 Features in Detail

### 1. Landing Page (`index.html`)
- Modern hero section with RFID animation
- Dark/Light theme toggle
- Unified login button
- Project overview and features
- Team information
- Responsive design

### 2. Unified Login (`login.html`)
- Single login page for both students and admins
- Automatic routing based on credentials
- Password visibility toggle
- Error handling with user-friendly messages

### 3. Student Dashboard
**Features:**
- Profile card with avatar
- Personal details display
- Today's attendance status
- Interactive calendar with color coding
- Date checker tool
- "Back to Admin" button (when accessed via admin)

### 4. Admin Dashboard (Enhanced)
**Dashboard Section:**
- Total students, Present, Absent, Attendance %
- Present/Absent students tables
- Auto-refresh every 15 seconds

**Attendance Logs:**
- Complete records with filtering
- Date-based search
- Export to CSV

**Students Section:**
- Student database with search
- Clickable cards to view individual dashboards
- No re-login required

**Reports:**
- Weekly attendance trends
- Google Charts visualization

## 🛠️ Customization

### Change Admin Credentials
In `js/loginHandler.js` and `admin-dashboard-enhanced.html`:
```javascript
if (username === 'YOUR_USERNAME' && password === 'YOUR_PASSWORD') {
```

### Update Google Sheets ID
Replace in all JS files:
```javascript
const SHEET_ID = 'YOUR_SPREADSHEET_ID';
```

### Theme Colors
Edit CSS variables in `css/style.css`:
```css
:root {
    --primary: #4361ee;
    --accent: #3b82f6;
    /* ... */
}
```

## 📱 Responsive Design
- Mobile-friendly layouts
- Adaptive navigation
- Touch-optimized controls
- Hamburger menu for small screens

## 🌓 Dark Mode
- Available on landing page and admin dashboard
- Click moon/sun icon to toggle
- Preference saved in localStorage
- Smooth color transitions

## 🔄 Session Management
- Admin can view student dashboards without login
- "Back to Admin" button appears when appropriate
- Session persists across navigation
- Auto-login if already authenticated

## 🐛 Troubleshooting

### Data Not Loading
1. Check internet connection
2. Verify Google Sheets is public ("Anyone with link can view")
3. Confirm Spreadsheet ID is correct
4. Check browser console for errors (F12)

### Login Issues
1. Clear browser cache and cookies
2. Verify credentials: Admin (`admin`/`admin123`) or Student (Roll No/`password`)
3. Try incognito/private mode

### Calendar Not Showing Attendance
1. Date format must be YYYY-MM-DD
2. Roll No must match between sheets
3. Student must exist in database sheet

## 🔒 Security Notes
⚠️ **Important**: This system is designed for educational/demonstration purposes.

For production use:
- Change default passwords immediately
- Use HTTPS
- Implement proper backend authentication
- Add rate limiting
- Sanitize all inputs

## 📞 Project Information

**Created by**: Sakshyam Bastakoti  
**Organization**: KMC Robotics Club, KMSS Lalitpur  
**Event**: Tech Expo 2025  
**Email**: sakshyambastakoti@gmail.com  
**GitHub**: [@sakshyambastakoti](https://github.com/sakshyambastakoti)  
**YouTube**: [@SakshyamBastakoti](https://www.youtube.com/@SakshyamBastakoti)

## 📄 License
Open source for educational purposes.

## 🙏 Acknowledgments
- Font Awesome for icons
- Google Fonts (Inter, Space Grotesk, Poppins)
- Google Charts API
- Google Sheets API

---

**Version**: 3.0  
**Last Updated**: November 2025  
**Status**: Production Ready ✅
