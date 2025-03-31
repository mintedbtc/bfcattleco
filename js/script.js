console.log("Website loaded");

// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      
      fetch('process_contact.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.text())
      .then(data => {
        // Create a temporary div to show the message
        const messageDiv = document.createElement('div');
        messageDiv.className = 'form-message';
        messageDiv.textContent = data;
        
        // Style the message
        messageDiv.style.padding = '1rem';
        messageDiv.style.marginTop = '1rem';
        messageDiv.style.borderRadius = '4px';
        messageDiv.style.backgroundColor = data.includes('Thank You') ? '#d4edda' : '#f8d7da';
        messageDiv.style.color = data.includes('Thank You') ? '#155724' : '#721c24';
        messageDiv.style.border = data.includes('Thank You') ? '1px solid #c3e6cb' : '1px solid #f5c6cb';
        
        // Remove any existing message
        const existingMessage = contactForm.querySelector('.form-message');
        if (existingMessage) {
          existingMessage.remove();
        }
        
        // Add the new message
        contactForm.appendChild(messageDiv);
        
        // Clear the form if successful
        if (data.includes('Thank You')) {
          contactForm.reset();
        }
        
        // Remove the message after 5 seconds
        setTimeout(() => {
          messageDiv.remove();
        }, 5000);
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
      });
    });
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add active class to current navigation item
document.addEventListener('DOMContentLoaded', function() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath.split('/').pop()) {
      link.classList.add('active');
    }
  });
});

// Add scroll-based animations
document.addEventListener('DOMContentLoaded', function() {
  const observerOptions = {
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, observerOptions);
  
  // Observe all grid items and news items
  document.querySelectorAll('.grid-item, .news-item').forEach(item => {
    observer.observe(item);
  });
});