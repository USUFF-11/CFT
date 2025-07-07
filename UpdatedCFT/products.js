// Product Filtering Functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    // Filter products based on category
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const category = button.getAttribute('data-category');
            
            // Show/hide products based on category
            productCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Initialize all products as visible
    productCards.forEach(card => {
        card.style.display = 'flex';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        // Animate cards on load
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);
    });
    
    // Quick View Modal Functionality
    const modal = document.getElementById('quickViewModal');
    const modalContent = modal.querySelector('.modal-content .modal-body');
    const closeModal = document.querySelector('.close-modal');
    const quickViewButtons = document.querySelectorAll('.quick-view');
    
    // Open modal with product details
    quickViewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productCard = button.closest('.product-card');
            const productTitle = productCard.querySelector('h3').textContent;
            const productCategory = productCard.querySelector('.product-category').textContent;
            const productDescription = productCard.querySelector('.product-description').textContent;
            const productImage = productCard.querySelector('img').src;
            const productSpecs = productCard.querySelector('.product-specs').innerHTML;
            
            // Create modal content
            modalContent.innerHTML = `
                <div class="modal-product">
                    <div class="modal-product-image">
                        <img src="${productImage}" alt="${productTitle}">
                    </div>
                    <div class="modal-product-details">
                        <h2>${productTitle}</h2>
                        <p class="product-category">${productCategory}</p>
                        <div class="product-specs">
                            ${productSpecs}
                        </div>
                        <p class="product-description">${productDescription}</p>
                        <a href="contact.html" class="inquiry-btn">Request a Quote</a>
                    </div>
                </div>
            `;
            
            // Show modal
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal when clicking the close button
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Testimonial slider functionality
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial');
    
    // Auto-rotate testimonials
    function rotateTestimonials() {
        // Hide current testimonial
        testimonials[currentTestimonial].style.display = 'none';
        
        // Move to next testimonial
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        
        // Show next testimonial
        testimonials[currentTestimonial].style.display = 'block';
        
        // Set timeout for next rotation
        setTimeout(rotateTestimonials, 8000);
    }
    
    // Initialize testimonial slider
    if (testimonials.length > 0) {
        // Hide all testimonials except the first one
        for (let i = 1; i < testimonials.length; i++) {
            testimonials[i].style.display = 'none';
        }
        
        // Start rotation
        setTimeout(rotateTestimonials, 8000);
    }
});

// Add smooth scrolling to all links
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
