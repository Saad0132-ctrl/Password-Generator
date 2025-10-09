const lengthSlider = document.getElementById('length');
const lengthValue = document.getElementById('length-value');
const passwordField = document.getElementById('password');
const copyBtn = document.getElementById('copy-btn');

// Update length display
lengthSlider.addEventListener('input', function() {
    lengthValue.textContent = this.value;
});

function generatePassword() {
    const length = parseInt(lengthSlider.value);
    const includeUppercase = document.getElementById('uppercase').checked;
    const includeLowercase = document.getElementById('lowercase').checked;
    const includeNumbers = document.getElementById('numbers').checked;
    const includeSymbols = document.getElementById('symbols').checked;
    
    let charset = '';
    
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    if (charset === '') {
        alert('Please select at least one character type!');
        return;
    }
    
    let password = '';
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    passwordField.value = password;
    updateStrengthIndicator(password);
}

function updateStrengthIndicator(password) {
    const strengthBar = document.getElementById('strength-bar');
    const strengthText = document.getElementById('strength-text');
    
    if (!password) {
        strengthBar.style.width = '0%';
        strengthBar.className = 'strength-bar';
        strengthText.textContent = 'Generate a password';
        return;
    }
    
    let score = 0;
    
    // Length check
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    
    // Character variety check
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    // Update indicator based on score
    if (score <= 2) {
        strengthBar.style.width = '25%';
        strengthBar.className = 'strength-bar weak';
        strengthText.textContent = 'Weak';
    } else if (score <= 3) {
        strengthBar.style.width = '50%';
        strengthBar.className = 'strength-bar fair';
        strengthText.textContent = 'Fair';
    } else if (score <= 4) {
        strengthBar.style.width = '75%';
        strengthBar.className = 'strength-bar good';
        strengthText.textContent = 'Good';
    } else {
        strengthBar.style.width = '100%';
        strengthBar.className = 'strength-bar strong';
        strengthText.textContent = 'Strong';
    }
}

function copyPassword() {
    if (passwordField.value === '') {
        alert('Generate a password first!');
        return;
    }
    
    passwordField.select();
    document.execCommand('copy');
    
    // Visual feedback
    copyBtn.textContent = 'Copied!';
    copyBtn.classList.add('copy-success');
    
    setTimeout(() => {
        copyBtn.textContent = 'Copy';
        copyBtn.classList.remove('copy-success');
    }, 2000);
}

// Generate initial password on page load
window.addEventListener('DOMContentLoaded', function() {
    generatePassword();
});