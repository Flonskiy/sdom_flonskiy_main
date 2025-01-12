import { elementsToClassToggle } from './modules/themeToggle.js';

document.addEventListener('DOMContentLoaded', () => {
  let buttonClicked = false;
  const themeIcon = document.getElementById('theme-icon');
  const themeSwitch = document.getElementById('theme-switch');

  // Apply theme styles based on the current theme
  const applyTheme = (theme) => {
    themeIcon.classList.toggle('bxs-moon', theme === 'light');
    themeIcon.classList.toggle('bx-sun', theme === 'dark');
  };

  // Toggle theme and apply classes to relevant elements
  const toggleTheme = () => {
    const newTheme = themeIcon.classList.contains('bx-sun') ? 'light' : 'dark';
    applyTheme(newTheme);
    toggleClassOnElements(newTheme === 'dark');
  };

  // Add/remove classes based on theme state
  const toggleClassOnElements = (applyClass) => {
    elementsToClassToggle.forEach(item => {
      let element = item.id ? document.getElementById(item.id) : item.element;
      if (element) {
        if (applyClass) {
          element.classList.add(item.className);
          if (item.replaceClass && element.classList.contains(item.replaceClass)) {
            element.classList.remove(item.replaceClass);
          }
        } else {
          element.classList.remove(item.className);
          if (item.replaceClass) {
            element.classList.add(item.replaceClass);
          }
        }
      } else {
        console.warn(`Element with ID ${item.id || item.element} not found`);
      }
    });
  };

  // Icon morphing effect
  const morphIcon = () => {
    fadeOutIcon();
    setTimeout(() => {
      toggleTheme();
      fadeInIcon();
    }, 500);
  };

  // Fade-out animation for the icon
  const fadeOutIcon = () => {
    themeIcon.style.cssText = `
      opacity: 0;
      transform: rotate(180deg) scale(0.5);
      transition: opacity 0.5s, transform 0.5s;
    `;
  };

  // Fade-in animation for the icon
  const fadeInIcon = () => {
    themeIcon.style.cssText = `
      opacity: 1;
      transform: rotate(0deg) scale(1);
      transition: opacity 0.5s, transform 0.5s;
    `;
  };

  // Handle button click event to toggle theme
  const handleClick = () => {
    if (buttonClicked) return;
    buttonClicked = true;

    // Scale-up animation for the icon on click
    themeIcon.style.cssText = `
      transform: scale(1.5);
      transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    `;

    themeIcon.addEventListener('transitionend', () => {
      morphIcon();
      setTimeout(() => {
        // Reset transformations after animation
        setTransformation(themeIcon, 0, 1, '0.5s ease-in-out');
        setTransformation(themeSwitch, 0, 1, '0.5s ease-in-out');
        setTimeout(() => {
          buttonClicked = false;
          if (themeSwitch.matches(':hover')) handleHoverIn();
        }, 700);
      }, 500);
    }, { once: true });

    themeSwitch.disabled = true;
    setTimeout(() => themeSwitch.disabled = false, 2000);
  };

  // Helper function to set transformations on elements
  const setTransformation = (element, rotation, scale, duration = '0.5s') => {
    element.style.cssText = `
      transform: rotate(${rotation}deg) scale(${scale});
      transition: transform ${duration};
    `;
  };

  // Handle hover-in effect
  const handleHoverIn = () => {
    if (!buttonClicked) {
      setTransformation(themeIcon, 360, 1);
      setTransformation(themeSwitch, 0, 1.2);
    }
  };

  // Handle hover-out effect
  const handleHoverOut = () => {
    if (!buttonClicked) {
      setTransformation(themeIcon, 0, 1);
      setTransformation(themeSwitch, 0, 1);
    }
  };

  // Set attributes for accessibility
  themeSwitch.setAttribute('role', 'button');
  themeSwitch.setAttribute('aria-label', 'Switch Theme');
  themeSwitch.setAttribute('tabindex', '0');

  // Event listeners for theme switch button
  themeSwitch.addEventListener('click', handleClick);
  themeSwitch.addEventListener('mouseover', handleHoverIn);
  themeSwitch.addEventListener('mouseout', handleHoverOut);
  themeSwitch.addEventListener('mouseleave', () => {
    if (!buttonClicked) {
      setTransformation(themeSwitch, 0, 1);
    }
  });

  // Set initial theme based on system preference
  const initialTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  applyTheme(initialTheme);
  toggleClassOnElements(initialTheme === 'dark');

  // Initial transformations for elements
  setTransformation(themeIcon, 0, 1);
  setTransformation(themeSwitch, 0, 1);
});
