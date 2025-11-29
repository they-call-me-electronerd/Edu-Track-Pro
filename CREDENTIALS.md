# 🔑 EduTrack Pro - Login Credentials

## Quick Reference Card

---

### 👨‍💼 ADMIN ACCESS

**Login Page**: `login.html`

```
Username: admin
Password: admin123
```

**Capabilities:**
- View all student records
- Access real-time attendance dashboard
- Generate and download reports
- Click student cards to view their dashboards
- No re-login required when navigating

---

### 👨‍🎓 STUDENT ACCESS

**Login Page**: `login.html`

```
Username: [Your Roll Number]
Password: password
```

**Example:**
```
Username: 1
Password: password
```

**Capabilities:**
- View personal attendance calendar
- Check attendance for specific dates
- See profile information
- Track attendance percentage

---

### 📊 GOOGLE SHEETS

**Current Spreadsheet ID:**
```
1S7L_hKo5LJW6bOPKvxLMkXVSiP4V1CH5rfX6xYqAhBE
```

**Access Link:**
[Open Spreadsheet](https://docs.google.com/spreadsheets/d/1S7L_hKo5LJW6bOPKvxLMkXVSiP4V1CH5rfX6xYqAhBE)

**Sharing**: Anyone with link can view

---

### 🔧 CUSTOMIZATION

**To Change Admin Credentials:**
1. Edit `js/loginHandler.js` (line ~28)
2. Edit `admin-dashboard-enhanced.html` (search for "admin")

**To Change Student Password:**
1. Edit `js/loginHandler.js` (line ~110)
2. Change `'password'` to your desired password

**To Use Different Google Sheet:**
1. Create sheet with "database" and "attendance" tabs
2. Make it publicly viewable
3. Copy the Spreadsheet ID from URL
4. Replace in all JS files

---

### ⚠️ SECURITY WARNING

**These are default credentials for demonstration purposes.**

**Before deploying in production:**
- ✅ Change admin username and password
- ✅ Use strong, unique passwords
- ✅ Implement proper backend authentication
- ✅ Use environment variables for sensitive data
- ✅ Enable HTTPS
- ✅ Add rate limiting to prevent brute force attacks

---

### 📞 Support

**Need help?**
- Read: `README.md` (full documentation)
- Quick start: `QUICKSTART.md` (3-step guide)
- Summary: `PROJECT_SUMMARY.md` (project overview)

**Contact:**
Email: sakshyambastakoti@gmail.com  
GitHub: [@sakshyambastakoti](https://github.com/sakshyambastakoti)

---

**Version**: 3.0  
**Last Updated**: November 2025  
**Status**: Ready for Use ✅
