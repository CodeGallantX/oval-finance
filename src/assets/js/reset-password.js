// Toggle password visibility
document.getElementById('toggleNewPassword').addEventListener('click', function() {
    const passwordInput = document.getElementById('newPassword');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.innerHTML = type === 'password' ? '<i class="bi bi-eye"></i>' : '<i class="bi bi-eye-slash"></i>';
});

document.getElementById('toggleConfirmPassword').addEventListener('click', function() {
    const passwordInput = document.getElementById('confirmPassword');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.innerHTML = type === 'password' ? '<i class="bi bi-eye"></i>' : '<i class="bi bi-eye-slash"></i>';
});

// Password validation
document.getElementById('newPassword').addEventListener('input', function() {
    const value = this.value;
    const hasMinLength = value.length >= 8;
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    
    // Update rule indicators
    document.getElementById('ruleLength').innerHTML = hasMinLength 
        ? '<i class="bi bi-check-circle-fill text-green-500 mr-2"></i> At least 8 characters' 
        : '<i class="bi bi-dash-circle mr-2"></i> At least 8 characters';
    
    document.getElementById('ruleUpper').innerHTML = hasUpperCase 
        ? '<i class="bi bi-check-circle-fill text-green-500 mr-2"></i> At least 1 upper case letter' 
        : '<i class="bi bi-dash-circle mr-2"></i> At least 1 upper case letter';
    
    document.getElementById('ruleLower').innerHTML = hasLowerCase 
        ? '<i class="bi bi-check-circle-fill text-green-500 mr-2"></i> At least 1 lower case letter' 
        : '<i class="bi bi-dash-circle mr-2"></i> At least 1 lower case letter';
    
    document.getElementById('ruleNumber').innerHTML = hasNumber 
        ? '<i class="bi bi-check-circle-fill text-green-500 mr-2"></i> At least 1 number' 
        : '<i class="bi bi-dash-circle mr-2"></i> At least 1 number';
    
    document.getElementById('ruleSymbol').innerHTML = hasSymbol 
        ? '<i class="bi bi-check-circle-fill text-green-500 mr-2"></i> At least 1 symbol (@!$% etc.)' 
        : '<i class="bi bi-dash-circle mr-2"></i> At least 1 symbol (@!$% etc.)';
});

// Form submission
document.getElementById('resetPasswordForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const submitBtn = document.getElementById('submitBtn');
    const submitText = document.getElementById('submitText');
    const submitSpinner = document.getElementById('submitSpinner');
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    
    // Validate passwords match
    if (newPassword !== confirmPassword) {
        confirmPasswordError.classList.remove('hidden');
        confirmPasswordError.textContent = 'Passwords do not match';
        return;
    } else {
        confirmPasswordError.classList.add('hidden');
    }

    // Show loading state
    submitText.classList.add('hidden');
    submitSpinner.classList.remove('hidden');
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Hide loading state
        submitText.classList.remove('hidden');
        submitSpinner.classList.add('hidden');
        submitBtn.disabled = false;

        // Show success toast
        showToast('Password reset successfully! Redirecting to login...');
        
        // Redirect after delay
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
    }, 2000);
});

// Toast functions
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    toastMessage.textContent = message;
    toast.classList.remove('hidden');
    setTimeout(hideToast, 5000);
}

function hideToast() {
    document.getElementById('toast').classList.add('hidden');
}