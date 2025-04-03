 // password visibility
 document.getElementById('togglePassword').addEventListener('click', function() {
    const passwordInput = document.getElementById('password');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.innerHTML = type === 'password' ? '<i class="bi bi-eye"></i>' : '<i class="bi bi-eye-slash"></i>';
});

// Form submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const loginBtn = document.getElementById('loginBtn');
    const loginText = document.getElementById('loginText');
    const loginSpinner = document.getElementById('loginSpinner');
    
    // Show loading state
    loginText.classList.add('hidden');
    loginSpinner.classList.remove('hidden');
    loginBtn.disabled = true;

    setTimeout(() => {
        loginText.classList.remove('hidden');
        loginSpinner.classList.add('hidden');
        loginBtn.disabled = false;

        // Show success toast
        showToast('Login successful! Redirecting...');
        
        // Redirect after delay
        setTimeout(() => {
            window.location.href = 'dashboard.html';
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