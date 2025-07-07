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
    
    // Coordinates for New York (example location)
    const coordinates = [40.7128, -74.0060];
    
    // Create map
    const map = L.map('map').setView(coordinates, 15);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Add a marker
    const marker = L.marker(coordinates).addTo(map);
    marker.bindPopup("<b>Global Export Headquarters</b><br>123 Export Street, New York, NY").openPopup();
    
    // Add a circle around the marker
    L.circle(coordinates, {
        color: '#3498db',
        fillColor: '#3498db',
        fillOpacity: 0.2,
        radius: 200
    }).addTo(map);
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    
    // Here you would typically send the form data to a server
    console.log('Form submitted:', formObject);
    
    // Show success message
    showFormSuccess();
    
    // Reset form
    e.target.reset();
    
    // Reset file input label
    const fileLabel = document.querySelector('.file-upload span');
    if (fileLabel) {
        fileLabel.textContent = 'Attach File (Optional)';
    }
}

// Show form success message
function showFormSuccess() {
    // Create success message element
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success-message';
    successMessage.innerHTML = `
        <div class="success-icon">
            <i class="fas fa-check-circle"></i>
        </div>
        <h3>Message Sent Successfully!</h3>
        <p>Thank you for contacting us. We'll get back to you as soon as possible.</p>
    `;
    
    // Style the success message
    successMessage.style.cssText = `
        background-color: #f8f9fa;
        padding: 30px;
        border-radius: 10px;
        text-align: center;
        margin-top: 20px;
        border-left: 4px solid #28a745;
    `;
    
    successMessage.querySelector('.success-icon').style.cssText = `
        font-size: 4rem;
        color: #28a745;
        margin-bottom: 20px;
    `;
    
    successMessage.querySelector('h3').style.cssText = `
        color: #28a745;
        margin-bottom: 10px;
    `;
    
    successMessage.querySelector('p').style.cssText = `
        color: #6c757d;
        margin-bottom: 0;
    `;
    
    // Insert after the form
    const form = document.querySelector('.contact-form form');
    form.parentNode.insertBefore(successMessage, form.nextSibling);
    
    // Scroll to the success message
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Remove the success message after 5 seconds
    setTimeout(() => {
        successMessage.style.opacity = '0';
        successMessage.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            successMessage.remove();
        }, 500);
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
