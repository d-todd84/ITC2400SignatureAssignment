document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');
    const successBanner = document.getElementById('formSuccessMessage');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); 
        clearErrors();

        let isValid = true;

        if (nameInput.value.trim() === '') {
            showError(nameInput, 'nameError', 'Please enter your full name.');
            isValid = false;
        } else if (nameInput.value.trim().length < 2) {
            showError(nameInput, 'nameError', 'Name must be at least 2 characters long.');
            isValid = false;
        }

        const emailValue = emailInput.value.trim();
        if (emailValue === '') {
            showError(emailInput, 'emailError', 'Please enter your email address.');
            isValid = false;
        } else if (!isValidEmail(emailValue)) {
            showError(emailInput, 'emailError', 'Please enter a valid email address (e.g., user@gmail.com).');
            isValid = false;
        }

        if (subjectInput.value === '') {
            showError(subjectInput, 'subjectError', 'Please select an inquiry topic.');
            isValid = false;
        }

        const messageValue = messageInput.value.trim();
        if (messageValue === '') {
            showError(messageInput, 'messageError', 'Please write your message.');
            isValid = false;
        } else if (messageValue.length < 10) {
            showError(messageInput, 'messageError', 'Message must be at least 10 characters long.');
            isValid = false;
        }

        if (isValid) {
            successBanner.style.display = 'block';
            form.reset();
            setTimeout(() => {
                successBanner.style.display = 'none';
            }, 5000);
        }
    });

    function showError(inputElement, errorSpanId, message) {
        inputElement.classList.add('input-error');
        const errorSpan = document.getElementById(errorSpanId);
        if (errorSpan) {
            errorSpan.textContent = message;
            errorSpan.style.display = 'block';
        }
    }

    function clearErrors() {
        const errorInputs = form.querySelectorAll('.input-error');
        errorInputs.forEach(input => input.classList.remove('input-error'));

        const errorSpans = form.querySelectorAll('.error-message');
        errorSpans.forEach(span => {
            span.textContent = '';
            span.style.display = 'none';
        });

        if (successBanner) {
            successBanner.style.display = 'none';
        }
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});