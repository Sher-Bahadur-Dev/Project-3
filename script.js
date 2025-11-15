const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    navbar.style.backdropFilter = 'blur(10px)';
    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
  } else {
    navbar.style.background = 'rgba(255, 255, 255, 0.7)';
    navbar.style.backdropFilter = 'blur(10px)';
    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
  }

  lastScroll = currentScroll;
});

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.skill-card, .project-card, .info-item, .contact-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const name = formData.get('name');
  const email = formData.get('email');
  const subject = formData.get('subject');
  const message = formData.get('message');

  const mailtoLink = `mailto:sb1895218@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

  window.location.href = mailtoLink;

  contactForm.reset();
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 70;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

document.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;

  document.querySelectorAll('.shape').forEach((shape, index) => {
    const speed = (index + 1) * 20;
    shape.style.transform = `translate(${mouseX * speed}px, ${mouseY * speed}px)`;
  });
});

document.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const floatingShapes = document.querySelectorAll('.shape');

  floatingShapes.forEach((shape, index) => {
    shape.style.transform = `translateY(${scrolled * 0.5 + index * 100}px)`;
  });
});

const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach((card, index) => {
  card.addEventListener('mouseenter', function() {
    skillCards.forEach((c, i) => {
      if (i !== index) {
        c.style.opacity = '0.6';
        c.style.filter = 'blur(2px)';
      }
    });
  });

  card.addEventListener('mouseleave', function() {
    skillCards.forEach(c => {
      c.style.opacity = '1';
      c.style.filter = 'blur(0)';
    });
  });
});

const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
  card.addEventListener('mouseenter', function() {
    projectCards.forEach((c, i) => {
      if (i !== index) {
        c.style.opacity = '0.7';
      }
    });
  });

  card.addEventListener('mouseleave', function() {
    projectCards.forEach(c => {
      c.style.opacity = '1';
    });
  });
});

const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
formInputs.forEach(input => {
  input.addEventListener('focus', function() {
    this.parentElement.style.borderColor = 'var(--primary-color)';
  });

  input.addEventListener('blur', function() {
    if (!this.value) {
      this.parentElement.style.borderColor = 'var(--border-color)';
    }
  });
});

window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});

const createParticle = (x, y) => {
  const particle = document.createElement('div');
  particle.style.position = 'fixed';
  particle.style.left = x + 'px';
  particle.style.top = y + 'px';
  particle.style.width = '10px';
  particle.style.height = '10px';
  particle.style.background = 'rgba(37, 99, 235, 0.6)';
  particle.style.borderRadius = '50%';
  particle.style.pointerEvents = 'none';
  particle.style.zIndex = '9999';
  particle.style.animation = 'particleFloat 1s ease-out forwards';

  document.body.appendChild(particle);

  setTimeout(() => particle.remove(), 1000);
};

document.addEventListener('click', (e) => {
  if (e.target.tagName === 'A' || e.target.closest('button')) {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        createParticle(
          e.clientX + (Math.random() - 0.5) * 50,
          e.clientY + (Math.random() - 0.5) * 50
        );
      }, i * 50);
    }
  }
});

const style = document.createElement('style');
style.textContent = `
  @keyframes particleFloat {
    0% {
      opacity: 1;
      transform: translate(0, 0) scale(1);
    }
    100% {
      opacity: 0;
      transform: translate(0, -50px) scale(0);
    }
  }
`;
document.head.appendChild(style);

const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => {
  btn.addEventListener('mouseenter', function(e) {
    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.5)';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.pointerEvents = 'none';
    ripple.style.animation = 'ripple 0.6s ease-out';

    this.style.position = 'relative';
    this.style.overflow = 'hidden';

    const rect = this.getBoundingClientRect();
    ripple.style.left = (e.clientX - rect.left - 10) + 'px';
    ripple.style.top = (e.clientY - rect.top - 10) + 'px';

    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
});

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyle);

window.addEventListener('resize', () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', vh + 'px');
});

window.dispatchEvent(new Event('resize'));
