document.addEventListener('DOMContentLoaded', function() {
    // Event Handling Section
    const clickMeBtn = document.getElementById('clickMeBtn');
    const clickOutput = document.getElementById('clickOutput');
    
    clickMeBtn.addEventListener('click', function() {
        clickOutput.textContent = 'Button was clicked!';
        clickOutput.classList.add('highlight');
        setTimeout(() => clickOutput.classList.remove('highlight'), 1000);
    });
    
    const hoverBox = document.getElementById('hoverBox');
    const hoverOutput = document.getElementById('hoverOutput');
    
    hoverBox.addEventListener('mouseenter', function() {
        hoverOutput.textContent = 'Hover state: active';
        this.style.backgroundColor = '#f0f0f0';
    });
    
    hoverBox.addEventListener('mouseleave', function() {
        hoverOutput.textContent = 'Hover state: inactive';
        this.style.backgroundColor = '';
    });
    
    const keyInput = document.getElementById('keyInput');
    const keyOutput = document.getElementById('keyOutput');
    
    keyInput.addEventListener('keydown', function(e) {
        keyOutput.textContent = 'Last key pressed: ' + e.key;
    });
    
    const secretBox = document.getElementById('secretBox');
    const secretOutput = document.getElementById('secretOutput');
    let pressTimer;
    
    // Double click
    secretBox.addEventListener('dblclick', function() {
        secretOutput.textContent = 'Double click detected!';
        this.style.backgroundColor = '#e6f7ff';
        setTimeout(() => {
            secretOutput.textContent = 'Try the secret actions';
            this.style.backgroundColor = '';
        }, 2000);
    });
    
    // Long press
    secretBox.addEventListener('mousedown', function() {
        pressTimer = setTimeout(function() {
            secretOutput.textContent = 'Long press detected!';
            secretBox.style.backgroundColor = '#fff0f5';
            setTimeout(() => {
                secretOutput.textContent = 'Try the secret actions';
                secretBox.style.backgroundColor = '';
            }, 2000);
        }, 1000);
    });
    
    secretBox.addEventListener('mouseup', function() {
        clearTimeout(pressTimer);
    });
    
    secretBox.addEventListener('mouseleave', function() {
        clearTimeout(pressTimer);
    });
    
    // Interactive Elements Section
    const colorBtn = document.getElementById('colorBtn');
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];
    let colorIndex = 0;
    
    colorBtn.addEventListener('click', function() {
        colorIndex = (colorIndex + 1) % colors.length;
        this.style.backgroundColor = colors[colorIndex];
        this.style.color = colorIndex > 2 ? '#000' : '#fff';
    });
    
    // Gallery functionality
    const galleryImages = document.querySelectorAll('.gallery img');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;
    
    function showImage(index) {
        galleryImages.forEach(img => img.classList.remove('active'));
        galleryImages[index].classList.add('active');
        currentIndex = index;
    }
    
    nextBtn.addEventListener('click', function() {
        let nextIndex = (currentIndex + 1) % galleryImages.length;
        showImage(nextIndex);
    });
    
    prevBtn.addEventListener('click', function() {
        let prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        showImage(prevIndex);
    });
    
    // Auto-advance gallery every 3 seconds
    setInterval(function() {
        let nextIndex = (currentIndex + 1) % galleryImages.length;
        showImage(nextIndex);
    }, 3000);
    
    // Accordion functionality
    const accordionBtns = document.querySelectorAll('.accordion-btn');
    
    accordionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            const isActive = accordionItem.classList.contains('active');
            
            // Close all accordion items
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked one if it wasn't active
            if (!isActive) {
                accordionItem.classList.add('active');
            }
        });
    });
    
    // Form Validation
    const myForm = document.getElementById('myForm');
    const usernameInput = document.getElementById('username');
    const userEmailInput = document.getElementById('userEmail');
    const userPasswordInput = document.getElementById('userPassword');
    const usernameError = document.getElementById('usernameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const formMessage = document.getElementById('formMessage');
    
    // Real-time validation
    usernameInput.addEventListener('input', validateUsername);
    userEmailInput.addEventListener('input', validateEmail);
    userPasswordInput.addEventListener('input', validatePassword);
    
    function validateUsername() {
        if (usernameInput.value.trim() === '') {
            showError(usernameInput, usernameError, 'Username is required');
            return false;
        } else {
            clearError(usernameInput, usernameError);
            return true;
        }
    }
    
    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (userEmailInput.value === '') {
            clearError(userEmailInput, emailError);
            return true;
        }
        
        if (!emailRegex.test(userEmailInput.value)) {
            showError(userEmailInput, emailError, 'Please enter a valid email');
            return false;
        } else {
            clearError(userEmailInput, emailError);
            return true;
        }
    }
    
    function validatePassword() {
        if (userPasswordInput.value === '') {
            clearError(userPasswordInput, passwordError);
            return true;
        }
        
        if (userPasswordInput.value.length < 8) {
            showError(userPasswordInput, passwordError, 'Password must be at least 8 characters');
            return false;
        } else {
            clearError(userPasswordInput, passwordError);
            return true;
        }
    }
    
    function showError(input, errorElement, message) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        input.classList.add('shake');
        setTimeout(() => input.classList.remove('shake'), 500);
    }
    
    function clearError(input, errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
    
    myForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isUsernameValid = validateUsername();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        if (isUsernameValid && isEmailValid && isPasswordValid) {
            formMessage.textContent = 'Form submitted successfully!';
            formMessage.style.display = 'block';
            formMessage.style.backgroundColor = '#d4edda';
            formMessage.style.color = '#155724';
            
            setTimeout(() => {
                myForm.reset();
                formMessage.style.display = 'none';
            }, 2000);
        } else {
            formMessage.textContent = 'Please fix the errors above';
            formMessage.style.display = 'block';
            formMessage.style.backgroundColor = '#f8d7da';
            formMessage.style.color = '#721c24';
        }
    });
});