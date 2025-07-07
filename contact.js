document.addEventListener('DOMContentLoaded', function() {
    // Initialize the map
    initMap();
    
    // Handle form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // FAQ accordion functionality
    initFAQAccordion();
    
    // Back to top button
    initBackToTopButton();
    
    // Form input animations
    initFormAnimations();
});

// Initialize the map with Leaflet.js
function initMap() {
    // Check if map container exists
    const mapElement = document.getElementById('map');
    if (!mapElement) return;
    
    // Coordinates for the specified location (from the Google Maps link)
    const coordinates = [30.0851, 31.2866]; // Approximate coordinates for the location
    
    // Create map with higher zoom level for better view
    const map = L.map('map').setView(coordinates, 17);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Add a marker with the address
    const marker = L.marker(coordinates).addTo(map);
    marker.bindPopup("<b>Compu Fast Technology</b><br>8 Abdel Karim Fahmy Street, Hadaeq El Qobba, Cairo, Egypt").openPopup();
    
    // Add a circle around the marker
    L.circle(coordinates, {
        color: '#3498db',
        fillColor: '#3498db',
        fillOpacity: 0.2,
        radius: 50
    }).addTo(map);
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    
    try {
        // Disable submit button and show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
        
        // Convert form data to object
        const formValues = {};
        formData.forEach((value, key) => {
            formValues[key] = value;
        });
        
        // Basic validation
        if (!formValues.name || !formValues.email || !formValues.message) {
            throw new Error('الرجاء إدخال الاسم والبريد الإلكتروني والرسالة');
        }
        
        // Simulate server delay
        setTimeout(() => {
            // Log the form data to console
            console.log('Form submission:', formValues);
            
            // Show success message
            showFormSuccess('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً');
            
            // Reset form
            form.reset();
            
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        }, 1000);
        
    } catch (error) {
        console.error('Error:', error);
        alert('خطأ: ' + (error.message || 'حدث خطأ أثناء إرسال الرسالة'));
        
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
    }
}

// Show form success message
function showFormSuccess(message) {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <h3>شكراً لك!</h3>
        <p>${message}</p>
    `;
    
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(successMessage, form);
    form.style.display = 'none';
    
    // Scroll to success message
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successMessage.remove();
        form.style.display = 'block';
    }, 5000);
}

// Initialize FAQ accordion functionality
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    otherAnswer.style.maxHeight = '0';
                    otherAnswer.style.padding = '0';
                    const otherToggle = otherItem.querySelector('.faq-toggle');
                    otherToggle.textContent = '+';
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            const answer = item.querySelector('.faq-answer');
            const toggle = item.querySelector('.faq-toggle');
            
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.padding = '20px 25px';
                toggle.textContent = '×';
            } else {
                answer.style.maxHeight = '0';
                answer.style.padding = '0';
                toggle.textContent = '+';
            }
        });
    });
    
    // Open first FAQ by default
    if (faqItems.length > 0) {
        const firstItem = faqItems[0];
        firstItem.classList.add('active');
        const firstAnswer = firstItem.querySelector('.faq-answer');
        firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px';
        firstAnswer.style.padding = '20px 25px';
        firstItem.querySelector('.faq-toggle').textContent = '×';
    }
}

// Initialize back to top button
function initBackToTopButton() {
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (!backToTopButton) return;
    
    // Show/hide button on scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Smooth scroll to top
    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize form animations and interactions
function initFormAnimations() {
    // File input styling
    const fileInput = document.querySelector('.file-upload input[type="file"]');
    const fileLabel = document.querySelector('.file-upload span');
    
    if (fileInput && fileLabel) {
        fileInput.addEventListener('change', function() {
            if (this.files.length > 0) {
                fileLabel.textContent = this.files[0].name;
            } else {
                fileLabel.textContent = 'Attach File (Optional)';
            }
        });
    }
    
    // Form input focus effects
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea, select');
        
        if (!input) return;
        
        // Check if input has value on page load
        if (input.value.trim() !== '') {
            const label = group.querySelector('label');
            if (label) {
                label.style.top = '-20px';
                label.style.fontSize = '0.8rem';
                label.style.color = '#3498db';
            }
        }
        
        // Add focus/blur events
        input.addEventListener('focus', function() {
            const label = this.parentElement.querySelector('label');
            if (label) {
                label.style.top = '-20px';
                label.style.fontSize = '0.8rem';
                label.style.color = '#3498db';
            }
            
            const focusBorder = this.parentElement.querySelector('.focus-border');
            if (focusBorder) {
                focusBorder.style.width = '100%';
            }
        });
        
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                const label = this.parentElement.querySelector('label');
                if (label) {
                    label.style.top = '12px';
                    label.style.fontSize = '1rem';
                    label.style.color = '#999';
                }
            }
            
            const focusBorder = this.parentElement.querySelector('.focus-border');
            if (focusBorder) {
                focusBorder.style.width = '0%';
            }
        });
        
        // For select elements
        if (input.tagName === 'SELECT') {
            input.addEventListener('change', function() {
                if (this.value !== '') {
                    const label = this.parentElement.querySelector('label');
                    if (label) {
                        label.style.top = '-20px';
                        label.style.fontSize = '0.8rem';
                        label.style.color = '#3498db';
                    }
                }
            });
        }
    });
    
    // Textarea auto-resize
    const textareas = document.querySelectorAll('textarea');
    
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    });
}

// Add smooth scrolling to all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return; // Skip empty anchors
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100, // Adjust for fixed header
                behavior: 'smooth'
            });
        }
    });
});
