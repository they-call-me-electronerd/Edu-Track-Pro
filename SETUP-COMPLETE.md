# 🚀 EDU TRACK PRO - COMPLETE SETUP GUIDE

## ✅ SYSTEM STATUS

Your Edu Track Pro is now fully configured and ready to use!

---

## 🔐 WORKING LOGIN CREDENTIALS

### **Admin Dashboard**
```
URL: http://localhost/Edu-Track-Pro/login.html
Username: admin
Password: admin123
```

### **Student Dashboard**
Use any of these student accounts:

| Roll Number | Student Name | Class | Password |
|------------|--------------|-------|----------|
| `87638915` | Amrit Panthi | M-5 | `student123` |
| `86183295` | Sakshyam Bastakoti | M-20 | `student123` |
| `84791362` | Sumitra k.c. | D-7 | `student123` |
| `85318479` | Mahesh Koirala | M-5 | `student123` |
| `81659327` | Kabita Dahal | M-16 | `student123` |
| `87321854` | Subesh Roka | D-9 | `student123` |

**Quick Test:**
```
URL: http://localhost/Edu-Track-Pro/login.html
Roll Number: 87638915
Password: student123
```

---

## 🌐 ACCESS URLS

### Main Pages
- **Landing Page:** `http://localhost/Edu-Track-Pro/`
- **Login Page:** `http://localhost/Edu-Track-Pro/login.html`
- **Admin Dashboard:** `http://localhost/Edu-Track-Pro/admin-dashboard.html`
- **Student Dashboard:** `http://localhost/Edu-Track-Pro/student-dashboard.html`

### Testing & Debug Tools
- **Login Test Page:** `http://localhost/Edu-Track-Pro/test-login.html` ⭐ **USE THIS TO TEST**
- **Debug Login:** `http://localhost/Edu-Track-Pro/API/debug-login.php`
- **Reset Passwords:** `http://localhost/Edu-Track-Pro/API/reset-passwords.php`
- **Test Connection:** `http://localhost/Edu-Track-Pro/API/test-connection.php`

---

## 🎯 QUICK START

### Method 1: Use Test Page (Recommended)
1. Open: `http://localhost/Edu-Track-Pro/test-login.html`
2. Click any "Quick Login" button
3. Click "Test Login"
4. Watch the detailed logs
5. You'll be redirected to the appropriate dashboard

### Method 2: Use Regular Login
1. Open: `http://localhost/Edu-Track-Pro/login.html`
2. Enter credentials (see above)
3. Click "Sign In"

---

## 🔧 TROUBLESHOOTING

### If Student Login Doesn't Work:

1. **Reset Passwords:**
   ```
   http://localhost/Edu-Track-Pro/API/reset-passwords.php
   ```

2. **Check Database:**
   - Open: `http://localhost/phpmyadmin`
   - Select database: `edutrack`
   - Verify tables: `students`, `users`, `attendance`

3. **Run Debug:**
   ```
   http://localhost/Edu-Track-Pro/API/debug-login.php
   ```

4. **Check XAMPP Services:**
   - Apache: Should be running (green)
   - MySQL: Should be running (green)

### Common Issues & Fixes:

**"Invalid username or password"**
- Run password reset: `http://localhost/Edu-Track-Pro/API/reset-passwords.php`
- Use exact roll number (no spaces)
- Password is case-sensitive: `student123` (all lowercase)

**"Connection error"**
- Check if XAMPP Apache & MySQL are running
- Verify URL starts with `http://localhost/Edu-Track-Pro/`

**Blank Dashboard**
- Check browser console (F12)
- Clear session: sessionStorage.clear()
- Try login again

---

## 📊 FEATURES

### Admin Dashboard
✅ View all students
✅ Real-time attendance tracking
✅ Add/Edit/Delete students
✅ Generate reports
✅ Export to CSV
✅ View student profiles
✅ Mark manual attendance
✅ Analytics & charts

### Student Dashboard
✅ Personal attendance calendar
✅ View attendance history
✅ Check specific dates
✅ Monthly statistics
✅ Present/Absent tracking
✅ Today's status

### Landing Page
✅ Responsive design
✅ Dark/Light theme toggle
✅ Animated cards
✅ Project information
✅ Technology stack
✅ Team information

---

## 🎨 THEME

- **Default:** Dark Mode 🌙
- **Toggle:** Click theme button in navbar
- **Persistence:** Theme saved in localStorage

---

## 📱 RESPONSIVE

✅ Desktop (1920px+)
✅ Laptop (1024px - 1920px)
✅ Tablet (768px - 1024px)
✅ Mobile (< 768px)

---

## 🔄 WORKFLOW

### Student Attendance Flow:
1. Student taps RFID card on reader
2. NodeMCU sends UID to API
3. API records attendance in database
4. Dashboard updates in real-time
5. Student can view on dashboard

### Manual Marking (Admin):
1. Admin logs in
2. Selects student
3. Clicks on calendar date
4. Marks present/absent

---

## 🗄️ DATABASE STRUCTURE

### Tables:
- `students` - Student records with credentials
- `users` - Admin credentials  
- `attendance` - Attendance logs with IN/OUT times

### Sample Data:
- 13 students pre-loaded
- 1 admin account
- Sample attendance records

---

## 🚨 SECURITY NOTES

⚠️ **IMPORTANT:**
- Change default admin password after first login
- All passwords are bcrypt hashed
- Use strong passwords in production
- This is for educational/demonstration purposes

---

## 📞 SUPPORT

If you encounter any issues:

1. Check browser console (F12 → Console tab)
2. Run debug script
3. Verify XAMPP services
4. Check database connection
5. Use test-login.html for detailed debugging

---

## ✨ UPDATES MADE

✅ Fixed password hashing
✅ Added comprehensive test page
✅ Created debug tools
✅ Updated all documentation
✅ Verified all API endpoints
✅ Enhanced error messages
✅ Added back to home button
✅ Improved card animations
✅ Set dark mode as default

---

## 🎉 YOU'RE ALL SET!

Your Edu Track Pro system is **fully functional** and ready to use!

### Test Now:
1. Open: `http://localhost/Edu-Track-Pro/test-login.html`
2. Click "Student: Amrit Panthi"
3. Click "Test Login"
4. Enjoy! 🎊

---

**Made with ❤️ by Sakshyam Bastakoti**
**Version:** 2.0
**Last Updated:** December 2, 2025
