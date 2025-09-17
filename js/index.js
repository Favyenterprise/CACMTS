document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".activities li");

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        
        setTimeout(() => {
          entry.target.classList.add("show");
        }, index * 200);

        obs.unobserve(entry.target); 
      }
    });
  }, { threshold: 0.2 });

  items.forEach(item => observer.observe(item));
});





 class AutoSlider {
            constructor() {
                this.currentSlide = 0;
                this.slides = document.querySelectorAll('.slide');
                this.totalSlides = this.slides.length;
                this.sliderWrapper = document.getElementById('sliderWrapper');
                this.progressFill = document.getElementById('progressFill');
                this.indicatorsContainer = document.getElementById('indicators');
                this.autoSlideInterval = null;
                this.slideTime = 5000; // 5 seconds per slide
                
                this.init();
            }

            init() {
                this.createIndicators();
                this.updateSlider();
                this.startAutoSlide();
                this.addEventListeners();
            }

            createIndicators() {
                for (let i = 0; i < this.totalSlides; i++) {
                    const indicator = document.createElement('div');
                    indicator.classList.add('indicator');
                    if (i === 0) indicator.classList.add('active');
                    indicator.addEventListener('click', () => this.goToSlide(i));
                    this.indicatorsContainer.appendChild(indicator);
                }
            }

            updateSlider() {
                const translateX = -this.currentSlide * 100;
                this.sliderWrapper.style.transform = `translateX(${translateX}%)`;
                
                // Update indicators
                const indicators = document.querySelectorAll('.indicator');
                indicators.forEach((indicator, index) => {
                    indicator.classList.toggle('active', index === this.currentSlide);
                });
            }

            goToSlide(slideIndex) {
                this.currentSlide = slideIndex;
                this.updateSlider();
                this.resetAutoSlide();
            }

            nextSlide() {
                this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
                this.updateSlider();
            }

            startAutoSlide() {
                this.startProgressBar();
                this.autoSlideInterval = setInterval(() => {
                    this.nextSlide();
                    this.startProgressBar();
                }, this.slideTime);
            }

            resetAutoSlide() {
                clearInterval(this.autoSlideInterval);
                this.startAutoSlide();
            }

            startProgressBar() {
                this.progressFill.style.width = '0%';
                this.progressFill.style.transition = 'none';
                
                setTimeout(() => {
                    this.progressFill.style.transition = `width ${this.slideTime}ms linear`;
                    this.progressFill.style.width = '100%';
                }, 50);
            }

            addEventListeners() {
                // Pause on hover
                const container = document.querySelector('.slider-container');
                container.addEventListener('mouseenter', () => {
                    clearInterval(this.autoSlideInterval);
                    this.progressFill.style.animationPlayState = 'paused';
                });
                
                container.addEventListener('mouseleave', () => {
                    this.startAutoSlide();
                });

                // Touch/swipe support for mobile
                let startX = 0;
                let endX = 0;

                container.addEventListener('touchstart', (e) => {
                    startX = e.touches[0].clientX;
                });

                container.addEventListener('touchend', (e) => {
                    endX = e.changedTouches[0].clientX;
                    const diff = startX - endX;
                    
                    if (Math.abs(diff) > 50) { // Minimum swipe distance
                        if (diff > 0) {
                            // Swipe left - next slide
                            this.nextSlide();
                        } else {
                            // Swipe right - previous slide
                            this.currentSlide = this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;
                            this.updateSlider();
                        }
                        this.resetAutoSlide();
                    }
                });
            }
        }

       


        // Prayer Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const prayerForm = document.getElementById('prayerForm');
    const giveButtons = document.querySelectorAll('.give-btn');
    
    // Handle Prayer Form Submission
    if (prayerForm) {
        prayerForm.addEventListener('submit', handlePrayerSubmission);
    }
    
    // Handle Give Button Clicks
    giveButtons.forEach(button => {
        button.addEventListener('click', handleGivingClick);
    });
    
    // Add form validation
    addFormValidation();
});

function handlePrayerSubmission(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const prayerData = {
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        prayerType: formData.get('prayerType'),
        prayerRequest: formData.get('prayerRequest'),
        followUp: formData.get('followUp') === 'on'
    };
    
    // Validate required fields
    if (!prayerData.fullName || !prayerData.email || !prayerData.prayerType || !prayerData.prayerRequest) {
        showErrorMessage('Please fill in all required fields.');
        return;
    }
    
    // Show loading state
    const submitBtn = event.target.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="btn-text">Submitting...</span><span class="btn-icon">⏳</span>';
    submitBtn.disabled = true;
    
    // Simulate API call (replace with actual API endpoint)
    setTimeout(() => {
        // Reset form
        event.target.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        showSuccessMessage('Your prayer request has been submitted successfully. Our prayer team will lift you up in prayer.');
        
        // In a real application, you would send this data to your server
        console.log('Prayer request submitted:', prayerData);
        
    }, 2000);
}

function handleGivingClick(event) {
    const givingType = event.target.getAttribute('data-type');
    
    // In a real application, this would redirect to a payment gateway
    // or open a giving modal with payment options
    
    let message = '';
    switch(givingType) {
        case 'tithes':
            message = 'Thank you for your heart to give tithes and offerings. You will be redirected to our secure giving platform.';
            break;
        case 'missions':
            message = 'Thank you for supporting our missions and outreach efforts. You will be redirected to our secure giving platform.';
            break;
        case 'building':
            message = 'Thank you for contributing to our building fund. You will be redirected to our secure giving platform.';
            break;
        default:
            message = 'Thank you for your generous heart. You will be redirected to our secure giving platform.';
    }
    
    showSuccessMessage(message);
    
    // Simulate redirect to payment gateway
    setTimeout(() => {
        // In real implementation, redirect to payment processor
        console.log(`Redirecting to giving platform for: ${givingType}`);
        // window.location.href = `https://giving-platform.com/${givingType}`;
    }, 3000);
}

function addFormValidation() {
    const inputs = document.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

function validateField(event) {
    const field = event.target;
    const value = field.value.trim();
    
    // Remove existing error styles
    field.classList.remove('error');
    
    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    // Phone validation (basic)
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(value)) {
            showFieldError(field, 'Please enter a valid phone number');
            return false;
        }
    }
    
    return true;
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;

}
