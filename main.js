import Lenis from 'lenis';
import './style.css';

// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
  autoRaf: true,
});

// Lenis scroll event listeners (Parallax & Progress)
lenis.on('scroll', (e) => {
  const scrollProgress = document.getElementById('scroll-progress');
  if (scrollProgress) {
    const scrollDepth = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    scrollProgress.style.width = `${scrollDepth * 100}%`;
  }

  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    heroBg.style.transform = `translateY(${window.scrollY * 0.4}px)`;
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // Custom Cursor Logic
  const cursor = document.getElementById('custom-cursor');
  
  document.addEventListener('mousemove', (e) => {
    if (cursor) {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    }
  });

  const interactiveElements = document.querySelectorAll('a, button, .menu-toggle, .fleet-card');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (cursor) cursor.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      if (cursor) cursor.classList.remove('hover');
    });
  });

  // Mobile Menu Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const header = document.getElementById('header');

  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    
    // Animate hamburger to X (visual only via CSS, or manual rotation)
    const spans = menuToggle.querySelectorAll('span');
    if (nav.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      const spans = menuToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });

  // Header background on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.background = 'rgba(255, 255, 255, 0.98)';
      header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.05)';
      header.style.padding = '0.8rem 0';
    } else {
      header.style.background = 'rgba(255, 255, 255, 0.95)';
      header.style.boxShadow = 'none';
      header.style.padding = '1.2rem 0';
    }
  });

  // Smooth Scroll and Reveal Animations via IntersectionObserver
  const revealElements = document.querySelectorAll('.reveal');

  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealElements.forEach(el => {
    revealOnScroll.observe(el);
  });
});
