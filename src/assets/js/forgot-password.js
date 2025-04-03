// Form submission
document.getElementById('forgotPasswordForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const resetBtn = document.getElementById('resetBtn');
    const resetText = document.getElementById('resetText');
    const resetSpinner = document.getElementById('resetSpinner');
    
    // Show loading state
    resetText.classList.add('hidden');
    resetSpinner.classList.remove('hidden');
    resetBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        // Hide loading state
        resetText.classList.remove('hidden');
        resetSpinner.classList.add('hidden');
        resetBtn.disabled = false;

        // Show success toast
        showToast('Password reset link sent to your phone!');
        
        // Redirect after delay
        setTimeout(() => {
            window.location.href = 'reset-password.html';
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