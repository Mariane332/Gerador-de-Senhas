// Seleção dos elementos do HTML
const passwordSpan = document.getElementById('password');
const copyBtn = document.getElementById('copyBtn');
const generateBtn = document.getElementById('generateBtn');

const lengthValSpan = document.getElementById('LengthVal');
const btnIncrement = document.getElementById('Increment');
const btnDecrement = document.getElementById('decrement');

const chkUppercase = document.getElementById('chkUppercase');
const chkLowercase = document.getElementById('chkLowercase');
const chkSymbols = document.getElementById('chkSymbols');
const chkNumbers = document.getElementById('chkNumbers');

const strengthIndicator = document.getElementById('strengthIndicator');
const securityMessage = document.getElementById('securityMessage');

// Conjuntos de caracteres
const CHARS_UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const CHARS_LOWER = 'abcdefghijklmnopqrstuvwxyz';
const CHARS_NUMBERS = '0123456789';
const CHARS_SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

let passwordLength = 12;

// --- CONTROLE DO TAMANHO DA SENHA ---
btnIncrement.addEventListener('click', () => {
    if (passwordLength < 32) {
        passwordLength++;
        lengthValSpan.textContent = passwordLength;
        generatePassword();
    }
});

btnDecrement.addEventListener('click', () => {
    if (passwordLength > 4) {
        passwordLength--;
        lengthValSpan.textContent = passwordLength;
        generatePassword();
    }
});

// --- LÓGICA DE GERAÇÃO DA SENHA ---
function generatePassword() {
    let allowedChars = '';
    
    if (chkUppercase.checked) allowedChars += CHARS_UPPER;
    if (chkLowercase.checked) allowedChars += CHARS_LOWER;
    if (chkNumbers.checked) allowedChars += CHARS_NUMBERS;
    if (chkSymbols.checked) allowedChars += CHARS_SYMBOLS;

    // Se nenhuma opção for selecionada, força minúsculas
    if (allowedChars === '') {
        chkLowercase.checked = true;
        allowedChars = CHARS_LOWER;
    }

    let password = '';
    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * allowedChars.length);
        password += allowedChars[randomIndex];
    }

    passwordSpan.textContent = password;
    evaluateSecurity(password);
}

// --- AVALIAÇÃO DE SEGURANÇA ---
function evaluateSecurity(password) {
    let score = 0;

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) {
        // Fraca
        strengthIndicator.textContent = '☹️';
        strengthIndicator.style.left = '80%';
        securityMessage.textContent = 'Atenção! Sua senha é fraca.';
    } else if (score <= 4) {
        // Média
        strengthIndicator.textContent = '😐';
        strengthIndicator.style.left = '50%';
        securityMessage.textContent = 'Sua senha tem uma segurança média.';
    } else {
        // Forte
        strengthIndicator.textContent = '😃';
        strengthIndicator.style.left = '10%';
        securityMessage.textContent = 'Parabéns! Sua senha é muito segura.';
    }
}

// --- BOTÃO COPIAR ---
copyBtn.addEventListener('click', () => {
    const textToCopy = passwordSpan.textContent;
    navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copiado!';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 1500);
    });
});

// --- EVENTOS DE CLIQUE E MUDANÇAS ---
generateBtn.addEventListener('click', generatePassword);

[chkUppercase, chkLowercase, chkSymbols, chkNumbers].forEach(checkbox => {
    checkbox.addEventListener('change', generatePassword);
});

// Gera a primeira senha ao carregar a página
generatePassword();