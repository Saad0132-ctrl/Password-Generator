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