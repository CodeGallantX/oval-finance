document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signupForm');
    const phoneInput = document.getElementById('phone');
    const phoneError = document.getElementById('phoneError');
    const passwordInput = document.getElementById('password');
    const passwordError = document.getElementById('passwordError');
    const togglePassword = document.getElementById('togglePassword');
    const passwordRules = document.getElementById('passwordRules');
    
    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.innerHTML = type === 'password' ? '<i class="bi bi-eye"></i>' : '<i class="bi bi-eye-slash"></i>';
    });

    // Password validation
    passwordInput.addEventListener('input', function() {
        const value = this.value;
        const hasMinLength = value.length >= 8;
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        const hasSymbol = /[!@#$%^&*(),._?":{}|<>]/.test(value);
        
        // Update rule indicators
        document.getElementById('ruleLength').innerHTML = hasMinLength 
            ? '<i class="bi bi-check-circle-fill text-green-500 mr-2"></i> At least 8 characters' 
            : '<i class="bi bi-x-circle mr-2 text-red-500"></i> At least 8 characters';
        
        document.getElementById('ruleUpper').innerHTML = hasUpperCase 
            ? '<i class="bi bi-check-circle-fill text-green-500 mr-2"></i> At least 1 upper case letter' 
            : '<i class="bi bi-x-circle mr-2 text-red-500"></i> At least 1 upper case letter';
        
        document.getElementById('ruleLower').innerHTML = hasLowerCase 
            ? '<i class="bi bi-check-circle-fill text-green-500 mr-2"></i> At least 1 lower case letter' 
            : '<i class="bi bi-x-circle mr-2 text-red-500"></i> At least 1 lower case letter';
        
        document.getElementById('ruleNumber').innerHTML = hasNumber 
            ? '<i class="bi bi-check-circle-fill text-green-500 mr-2"></i> At least 1 number' 
            : '<i class="bi bi-x-circle mr-2 text-red-500"></i> At least 1 number';
        
        document.getElementById('ruleSymbol').innerHTML = hasSymbol 
            ? '<i class="bi bi-check-circle-fill text-green-500 mr-2"></i> At least 1 symbol (@!$% etc.)' 
            : '<i class="bi bi-x-circle mr-2 text-red-500"></i> At least 1 symbol (@!$% etc.)';
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;
        
        // Phone validation
        if (!phoneInput.value.trim()) {
            phoneError.classList.remove('hidden');
            phoneError.textContent = 'Please enter your phone number';
            isValid = false;
        } else if (!/^\d{10}$/.test(phoneInput.value.trim())) {
            phoneError.classList.remove('hidden');
            phoneError.textContent = 'Please enter a valid phone number';
            isValid = false;
        } else {
            phoneError.classList.add('hidden');
        }
        
        // Password validation
        const password = passwordInput.value;
        if (!password) {
            passwordError.classList.remove('hidden');
            passwordError.textContent = 'Please enter your password';
            isValid = false;
        } else if (password.length < 8) {
            passwordError.classList.remove('hidden');
            passwordError.textContent = 'Password must be at least 8 characters';
            isValid = false;
        } else if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            passwordError.classList.remove('hidden');
            passwordError.textContent = 'Password does not meet all requirements';
            isValid = false;
        } else {
            passwordError.classList.add('hidden');
        }
        
        // If valid, submit form
        if (isValid) {
            alert('Account created successfully!'); // Replace with actual form submission
            // form.submit();
        }
    });

    // Show/hide password rules on focus/blur
    passwordInput.addEventListener('focus', function() {
        passwordRules.classList.remove('hidden');
    });
    
    passwordInput.addEventListener('blur', function() {
        setTimeout(() => {
            if (document.activeElement !== passwordInput) {
                passwordRules.classList.add('hidden');
            }
        }, 200);
    });
});