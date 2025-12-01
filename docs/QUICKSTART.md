# 🚀 EduTrack Pro - Quick Start Guide

Get your IoT RFID attendance system up and running in 3 simple steps!

## Step 1: Open the Project
1. Navigate to the project folder
2. Open `index.html` in your web browser
3. You'll see the landing page with the "Login" button

## Step 2: Login

### For Admins:
1. Click "Login" button
2. Enter credentials:
   - **Username**: `admin`
   - **Password**: `admin123`
3. You'll be redirected to the Admin Dashboard

### For Students:
1. Click "Login" button
2. Enter credentials:
   - **Username**: Your Roll Number (e.g., `1`, `2`, `3`)
   - **Password**: `password`
3. You'll see your personal attendance calendar

## Step 3: Start Using!

### Admin Features:
- ✅ View real-time attendance statistics
- ✅ Click on student cards to view their dashboards (no login needed!)
- ✅ Filter attendance by date
- ✅ Download attendance reports as CSV
- ✅ Toggle dark/light theme with the moon/sun icon
- ✅ Click "Back to Admin" when viewing student dashboards

### Student Features:
- ✅ View your attendance calendar
- ✅ Check specific dates
- ✅ See your profile information
- ✅ Track present/absent days

## 🔧 Configuration (Optional)

### Change Admin Credentials
Edit these files:
- `js/loginHandler.js` (line ~28)
- `admin-dashboard-enhanced.html` (search for "admin" and "admin123")

### Use Your Own Google Sheet
1. Create a Google Sheet with two sheets: `database` and `attendance`
2. Set sharing to "Anyone with link can view"
3. Copy the Spreadsheet ID from the URL
4. Replace in all JS files (search for: `1S7L_hKo5LJW6bOPKvxLMkXVSiP4V1CH5rfX6xYqAhBE`)

## 🎯 What's New in v3.0

✨ **Unified Login** - One login page for both students and admins  
✨ **Smart Routing** - Automatic redirection based on credentials  
✨ **Admin Bypass** - View any student dashboard without login  
✨ **Session Management** - No re-login required when navigating  
✨ **Dark Mode** - Eye-friendly theme toggle on all pages  
✨ **KMC Robotics Branding** - Club logo integrated in admin dashboard  

## 📞 Need Help?

**Common Issues:**
- **Can't login?** → Check credentials (admin/admin123 or Roll No/password)
- **No data showing?** → Check internet connection and Google Sheets access
- **Calendar empty?** → Verify date format is YYYY-MM-DD in attendance sheet

**Contact:**  
Email: sakshyambastakoti@gmail.com  
GitHub: [@sakshyambastakoti](https://github.com/sakshyambastakoti)

---

**Version**: 3.0  
**Created by**: Sakshyam Bastakoti | KMC Robotics Club  
**Status**: Ready to Use ✅
