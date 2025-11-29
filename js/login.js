document.addEventListener('DOMContentLoaded', () => {
    // Password Toggle
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.querySelector('#password');

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function () {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);

            // Toggle icon
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    }

    // Prevent default for quick access cards and forgot password
    const quickAccessCards = document.querySelectorAll('.access-card');
    quickAccessCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const cardType = card.querySelector('span').textContent;
            console.log(`${cardType} clicked`);
            // Add your navigation logic here
        });
    });

    const forgotPassword = document.querySelector('.forgot-password');
    if (forgotPassword) {
        forgotPassword.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Password recovery feature coming soon!');
            // Add your password recovery logic here
        });
    }

    // Remember me functionality
    const rememberMeCheckbox = document.querySelector('#rememberMe');
    if (rememberMeCheckbox) {
        // Load saved preference
        const savedUsername = localStorage.getItem('rememberedUsername');
        if (savedUsername) {
            document.querySelector('#username').value = savedUsername;
            rememberMeCheckbox.checked = true;
        }

        // Save preference on change
        rememberMeCheckbox.addEventListener('change', function() {
            if (!this.checked) {
                localStorage.removeItem('rememberedUsername');
            }
        });
    }

    // Add input animations
    const inputFields = document.querySelectorAll('.input-field');
    inputFields.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });

    // Login Form Submission logic moved to loginHandler.js
});
