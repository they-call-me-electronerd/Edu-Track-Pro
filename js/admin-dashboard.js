// Admin Dashboard Logic

// Toast Notification Function
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    if (!toast || !toastMessage) return;
    
    toastMessage.textContent = message;
    toast.className = 'toast show ' + type;
    
    setTimeout(() => {
        toast.className = toast.className.replace('show', '');
    }, 3000);
}

// Loading Overlay Functions
function showLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) overlay.style.display = 'flex';
}

function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) overlay.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    // Check session
    if (sessionStorage.getItem('isLoggedIn') !== 'true' || sessionStorage.getItem('userRole') !== 'admin') {
        window.location.href = 'login.html';
    }

    // Initialize UI Components
    initNavigation();
    initTheme();
    updateDate();
    initSearch();
    initReports();

    // Fetch Data
    showLoading();
    fetchAdminData().finally(() => hideLoading());
    
    // Show welcome message
    showToast('Welcome to Admin Dashboard!', 'success');
});

function logout() {
    sessionStorage.clear();
    showToast('Logging out...', 'info');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

function updateDate() {
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        dateElement.textContent = new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    
    // Add smooth transition to page title
    const pageTitle = document.getElementById('pageTitle');
    if (pageTitle) {
        pageTitle.style.transition = 'opacity 0.3s ease';
    }
}

function initNavigation() {
    const menuItems = document.querySelectorAll('.sidebar-menu li');
    const sections = document.querySelectorAll('.section');
    const pageTitle = document.getElementById('pageTitle');

    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();

            // Remove active class from all items
            menuItems.forEach(i => i.classList.remove('active'));

            // Add active class to clicked item with animation
            item.classList.add('active');

            // Get target section
            const targetId = item.getAttribute('data-target');

            // Update Page Title with fade effect
            const titleText = item.querySelector('span').textContent;
            pageTitle.style.opacity = '0';
            setTimeout(() => {
                pageTitle.textContent = titleText;
                pageTitle.style.opacity = '1';
            }, 150);

            // Show target section with smooth transition
            sections.forEach(section => {
                if (section.id === targetId) {
                    section.style.opacity = '0';
                    section.classList.add('active');
                    setTimeout(() => {
                        section.style.opacity = '1';
                    }, 50);
                } else {
                    section.classList.remove('active');
                }
            });
            
            // Show toast notification
            showToast(`Switched to ${titleText}`, 'info');
        });
    });
}

function initTheme() {
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    const htmlElement = document.documentElement;

    // Check saved theme
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'light') {
        htmlElement.setAttribute('data-theme', 'light');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        htmlElement.removeAttribute('data-theme');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');

        if (currentTheme === 'light') {
            // Switch to Dark
            htmlElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            // Switch to Light
            htmlElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    });
}

let globalStudents = [];
let globalLogs = [];
let globalStudentMap = {};

// Placeholder for data fetching
async function fetchAdminData() {
    const databaseUrl = 'https://docs.google.com/spreadsheets/d/1S7L_hKo5LJW6bOPKvxLMkXVSiP4V1CH5rfX6xYqAhBE/gviz/tq?sheet=database&tqx=out:json';
    const attendanceUrl = 'https://docs.google.com/spreadsheets/d/1S7L_hKo5LJW6bOPKvxLMkXVSiP4V1CH5rfX6xYqAhBE/gviz/tq?sheet=attendance&tqx=out:json';

    try {
        // Fetch Database (Students)
        const dbResponse = await fetch(databaseUrl);
        const dbText = await dbResponse.text();
        const dbJson = JSON.parse(dbText.substring(47).slice(0, -2));
        const students = dbJson.table.rows;

        // Fetch Attendance
        const attResponse = await fetch(attendanceUrl);
        const attText = await attResponse.text();
        const attJson = JSON.parse(attText.substring(47).slice(0, -2));
        const logs = attJson.table.rows;

        // Process Data
        processAdminData(students, logs);

    } catch (error) {
        console.error('Error fetching admin data:', error);
    }
}

function processAdminData(students, logs) {
    // Store globally
    globalStudents = students;

    // 1. Total Students
    const totalStudents = students.length;
    document.getElementById('totalStudents').textContent = totalStudents;

    // 2. Process Logs & Today's Stats
    const todayStr = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const presentSet = new Set();
    const recentLogs = [];
    const allLogs = [];

    // Helper for Title Case
    const toTitleCase = (str) => {
        if (typeof str !== 'string') return String(str);
        return str.toLowerCase().split(' ').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    };

    // Map student Roll to Name/Class for easy lookup
    const studentMap = {};
    students.forEach(row => {
        const roll = row.c[2] ? String(row.c[2].v) : '';
        if (roll) {
            studentMap[roll] = {
                name: row.c[1] ? toTitleCase(row.c[1].v) : 'Unknown',
                class: row.c[3] ? toTitleCase(row.c[3].v) : 'N/A',
                uid: row.c[0] ? (row.c[0].v || 'N/A') : 'N/A',
                address: row.c[4] ? toTitleCase(row.c[4].v) : 'N/A'
            };
        }
    });

    globalStudentMap = studentMap;

    // Process Logs (Reverse order for latest first)
    // Logs columns: 0: Date, 1: Time, 4: Roll No
    for (let i = logs.length - 1; i >= 0; i--) {
        const row = logs[i];
        const date = row.c[0] ? row.c[0].f || row.c[0].v : '';
        const time = row.c[1] ? row.c[1].f || row.c[1].v : '';
        const roll = row.c[4] ? String(row.c[4].v) : '';

        if (roll && studentMap[roll]) {
            const student = studentMap[roll];

            // Add to All Logs
            allLogs.push({
                date: date,
                time: time,
                name: student.name,
                roll: roll,
                class: student.class,
                status: 'Present'
            });

            // Check if today
            if (date === todayStr) {
                presentSet.add(roll);
            }
        }
    }

    globalLogs = allLogs;

    // Update Stats
    const presentCount = presentSet.size;
    const absentCount = totalStudents - presentCount;
    const attendanceRate = totalStudents > 0 ? Math.round((presentCount / totalStudents) * 100) : 0;

    document.getElementById('presentToday').textContent = presentCount;
    document.getElementById('absentToday').textContent = absentCount;
    
    // Update time display
    const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const presentTimeElem = document.getElementById('presentTime');
    const absentTimeElem = document.getElementById('absentTime');
    if (presentTimeElem) presentTimeElem.textContent = `As of ${currentTime}`;
    if (absentTimeElem) absentTimeElem.textContent = `As of ${currentTime}`;
    
    const attendancePercentElem = document.getElementById('attendancePercent');
    if (attendancePercentElem) {
        attendancePercentElem.textContent = `${attendanceRate}%`;
    }
    const attendanceRateElem = document.getElementById('attendanceRate');
    if (attendanceRateElem) {
        attendanceRateElem.textContent = `${attendanceRate}%`;
    }
    const attendanceRateBarElem = document.getElementById('attendanceRateBar');
    if (attendanceRateBarElem) {
        attendanceRateBarElem.style.width = `${attendanceRate}%`;
    }

    // Populate Present Students Table
    const presentStudentsTable = document.getElementById('presentStudentsTable');
    if (presentStudentsTable) {
        presentStudentsTable.innerHTML = '';
        
        // Get today's check-ins with times
        const todaysCheckIns = allLogs.filter(log => log.date === todayStr);
        
        if (todaysCheckIns.length === 0) {
            presentStudentsTable.innerHTML = '<tr><td colspan="4" style="text-align: center; padding: 30px; color: var(--text-light);">No students present today</td></tr>';
        } else {
            todaysCheckIns.forEach(log => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${log.name}</td>
                    <td>${log.roll}</td>
                    <td>${log.time}</td>
                    <td>${studentMap[log.roll]?.address || 'N/A'}</td>
                `;
                presentStudentsTable.appendChild(tr);
            });
        }
    }

    // Populate Absent Students Table
    const absentStudentsTable = document.getElementById('absentStudentsTable');
    if (absentStudentsTable) {
        absentStudentsTable.innerHTML = '';
        
        // Find students who are not in presentSet
        const absentStudents = [];
        students.forEach(row => {
            const roll = row.c[2] ? String(row.c[2].v) : '';
            if (roll && studentMap[roll] && !presentSet.has(roll)) {
                absentStudents.push({
                    name: studentMap[roll].name,
                    roll: roll,
                    address: studentMap[roll].address
                });
            }
        });
        
        if (absentStudents.length === 0) {
            absentStudentsTable.innerHTML = '<tr><td colspan="3" style="text-align: center; padding: 30px; color: var(--text-light);">All students are present!</td></tr>';
        } else {
            absentStudents.forEach(student => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${student.name}</td>
                    <td>${student.roll}</td>
                    <td>${student.address}</td>
                `;
                absentStudentsTable.appendChild(tr);
            });
        }
    }

    // Populate Student Cards Grid (New Design)
    const studentCardsContainer = document.getElementById('studentCardsContainer');
    if (studentCardsContainer) {
        studentCardsContainer.innerHTML = '';
        
        students.forEach(row => {
            const roll = row.c[2] ? String(row.c[2].v) : '';
            if (roll && studentMap[roll]) {
                const s = studentMap[roll];
                
                // Get first letter of name for avatar
                const avatarLetter = s.name.charAt(0).toUpperCase();
                
                // Check if student is present today
                const isPresent = presentSet.has(roll);
                
                const card = document.createElement('div');
                card.className = 'student-card';
                card.setAttribute('data-student-name', s.name.toLowerCase());
                card.setAttribute('data-student-roll', roll);
                card.onclick = () => navigateToStudentDashboard(roll, s.name);
                
                card.innerHTML = `
                    <div class="student-card-header">
                        <div class="student-avatar">${avatarLetter}</div>
                        <div class="student-info">
                            <h4>${s.name}</h4>
                            <div class="student-detail">
                                <i class="fas fa-id-card"></i>
                                <span>Roll No: ${roll}</span>
                            </div>
                        </div>
                    </div>
                    <div class="student-detail">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${s.address}</span>
                    </div>
                    <div class="student-status ${isPresent ? 'present' : 'absent'}">
                        <i class="fas fa-circle"></i>
                        Status Today: ${isPresent ? 'Present' : 'Absent'}
                    </div>
                `;
                
                studentCardsContainer.appendChild(card);
            }
        });
        
        if (students.length === 0) {
            studentCardsContainer.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-light);">No students found</div>';
        }
    }

    // Populate Recent Activity (Top 5)
    const recentTableBody = document.getElementById('recentActivityTable');
    recentTableBody.innerHTML = '';
    allLogs.slice(0, 5).forEach(log => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${log.time}</td>
            <td>${log.name}</td>
            <td>${log.roll}</td>
            <td><span style="color: var(--success); font-weight: 600;">Present</span></td>
        `;
        recentTableBody.appendChild(tr);
    });

    // Populate Full Logs Table
    const fullLogsTableBody = document.getElementById('fullLogsTable');
    fullLogsTableBody.innerHTML = '';
    allLogs.forEach(log => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${log.date}</td>
            <td>${log.time}</td>
            <td>${log.name}</td>
            <td>${log.roll}</td>
            <td>${log.class}</td>
            <td><span style="color: var(--success); font-weight: 600;">Present</span></td>
        `;
        fullLogsTableBody.appendChild(tr);
    });
}

function refreshData() {
    const btn = document.querySelector('.btn-sm i');
    btn.classList.add('fa-spin');
    showToast('Refreshing data...', 'info');
    
    fetchAdminData().then(() => {
        setTimeout(() => {
            btn.classList.remove('fa-spin');
            showToast('Data refreshed successfully!', 'success');
        }, 500);
    }).catch(error => {
        btn.classList.remove('fa-spin');
        showToast('Failed to refresh data', 'error');
    });
}

function initSearch() {
    // Log Search
    const logSearch = document.getElementById('logSearch');
    if (logSearch) {
        logSearch.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const tableBody = document.getElementById('fullLogsTable');
            const rows = tableBody.getElementsByTagName('tr');
            let visibleCount = 0;

            Array.from(rows).forEach(row => {
                const text = row.textContent.toLowerCase();
                const isVisible = text.includes(searchTerm);
                row.style.display = isVisible ? '' : 'none';
                if (isVisible) visibleCount++;
            });
            
            if (searchTerm && visibleCount === 0) {
                showToast('No matching logs found', 'info');
            }
        });
    }

    // Student Search
    const studentSearch = document.getElementById('studentSearch');
    if (studentSearch) {
        studentSearch.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const tableBody = document.getElementById('studentsTable');
            const rows = tableBody.getElementsByTagName('tr');
            let visibleCount = 0;

            Array.from(rows).forEach(row => {
                const text = row.textContent.toLowerCase();
                const isVisible = text.includes(searchTerm);
                row.style.display = isVisible ? '' : 'none';
                if (isVisible) visibleCount++;
            });
            
            if (searchTerm && visibleCount === 0) {
                showToast('No matching students found', 'info');
            }
        });
    }
}

function initReports() {
    // Daily Report (CSV)
    const btnDaily = document.getElementById('btnDownloadDaily');
    if (btnDaily) {
        btnDaily.addEventListener('click', () => {
            const todayStr = new Date().toISOString().split('T')[0];
            const dailyLogs = globalLogs.filter(log => log.date === todayStr);

            if (dailyLogs.length === 0) {
                showToast('No attendance records found for today.', 'error');
                return;
            }

            const headers = ['Date', 'Time', 'Name', 'Roll No', 'Class', 'Status'];
            const data = dailyLogs.map(log => [
                log.date,
                log.time,
                log.name,
                log.roll,
                log.class,
                log.status
            ]);

            downloadCSV([headers, ...data], `attendance_daily_${todayStr}.csv`);
            showToast('Daily report downloaded successfully!', 'success');
        });
    }

    // Monthly Report (Excel/CSV)
    const btnMonthly = document.getElementById('btnDownloadMonthly');
    if (btnMonthly) {
        btnMonthly.addEventListener('click', () => {
            const today = new Date();
            const currentMonth = today.getMonth() + 1; // 1-12
            const currentYear = today.getFullYear();

            const monthlyLogs = globalLogs.filter(log => {
                const logDate = new Date(log.date);
                return (logDate.getMonth() + 1) === currentMonth && logDate.getFullYear() === currentYear;
            });

            if (monthlyLogs.length === 0) {
                alert('No attendance records found for this month.');
                return;
            }

            const headers = ['Date', 'Time', 'Name', 'Roll No', 'Class', 'Status'];
            const data = monthlyLogs.map(log => [
                log.date,
                log.time,
                log.name,
                log.roll,
                log.class,
                log.status
            ]);

            downloadCSV([headers, ...data], `attendance_monthly_${currentYear}_${currentMonth}.csv`);
        });
    }

    // Absentees List
    const btnAbsentees = document.getElementById('btnViewAbsentees');
    if (btnAbsentees) {
        btnAbsentees.addEventListener('click', () => {
            const todayStr = new Date().toISOString().split('T')[0];
            const presentRolls = new Set(globalLogs
                .filter(log => log.date === todayStr)
                .map(log => log.roll));

            const absentees = [];

            // Iterate over all students to find who is missing
            for (const roll in globalStudentMap) {
                if (!presentRolls.has(roll)) {
                    const s = globalStudentMap[roll];
                    absentees.push([
                        todayStr,
                        s.name,
                        roll,
                        s.class,
                        'Absent'
                    ]);
                }
            }

            if (absentees.length === 0) {
                alert('Everyone is present today!');
                return;
            }

            const headers = ['Date', 'Name', 'Roll No', 'Class', 'Status'];
            downloadCSV([headers, ...absentees], `absentees_${todayStr}.csv`);
        });
    }
}

function downloadCSV(data, filename) {
    const csvContent = data.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');

    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, filename);
    } else {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// Navigate to student dashboard
function navigateToStudentDashboard(rollNo, studentName) {
    // Store student info in session and set admin bypass flag
    sessionStorage.setItem('selectedStudentRoll', rollNo);
    sessionStorage.setItem('selectedStudentName', studentName);
    sessionStorage.setItem('adminBypass', 'true');
    sessionStorage.setItem('studentId', rollNo);
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('userRole', 'student');
    
    showToast(`Opening dashboard for ${studentName}`);
    
    // Redirect to student dashboard
    setTimeout(() => {
        window.location.href = `student-dashboard.html?roll=${rollNo}`;
    }, 500);
}

// Search student cards
function searchStudentCards() {
    const searchTerm = document.getElementById('studentSearch').value.toLowerCase();
    const cards = document.querySelectorAll('.student-card');
    let visibleCount = 0;
    
    cards.forEach(card => {
        const name = card.getAttribute('data-student-name') || '';
        const roll = card.getAttribute('data-student-roll') || '';
        const isVisible = name.includes(searchTerm) || roll.includes(searchTerm);
        
        card.style.display = isVisible ? 'block' : 'none';
        if (isVisible) visibleCount++;
    });
    
    if (searchTerm && visibleCount === 0) {
        showToast('No matching students found', 'info');
    }
}