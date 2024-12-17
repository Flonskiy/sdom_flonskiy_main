$(document).ready(function () {
  let buttonClicked = false; // Track button click state
  const $html = $('html');
  const $themeIcon = $('#theme-icon');
  const $themeSwitch = $('#theme-switch');

  // Apply the specified theme (dark or light)
  const applyTheme = (theme) => {
    $html.toggleClass('dark', theme === 'dark');
    $themeIcon.toggleClass('bxs-moon', theme === 'light').toggleClass('bx-sun', theme === 'dark'); // Change icon
  };

  // Toggle between themes
  const toggleTheme = () => {
    const newTheme = $html.hasClass('dark') ? 'light' : 'dark';
    applyTheme(newTheme);
  };

  // Morphing animation during theme switch
  const morphIcon = () => {
    fadeOutIcon();
    setTimeout(() => {
      toggleTheme();
      fadeInIcon();
    }, 500);
  };

  const fadeOutIcon = () => {
    $themeIcon.css({
      opacity: 0,
      transform: 'rotate(180deg) scale(0.5)',
      transition: 'opacity 0.5s, transform 0.5s',
    });
  };

  const fadeInIcon = () => {
    $themeIcon.css({
      opacity: 1,
      transform: 'rotate(0deg) scale(1)',
      transition: 'opacity 0.5s, transform 0.5s',
    });
  };

  // Handle button click events
  const handleClick = () => {
    if (buttonClicked) return;

    buttonClicked = true; // Prevent rapid clicks
    $themeIcon.css({
      transform: 'scale(1.5)',
      transition: 'transform 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
    });

    $themeIcon.one('transitionend', () => {
      morphIcon();
      setTimeout(() => {
        setTransformation($themeIcon, 0, 1, '0.5s ease-in-out');
        setTransformation($themeSwitch, 0, 1, '0.5s ease-in-out');
        setTimeout(() => {
          buttonClicked = false; // Allow button to be clicked again
          if ($themeSwitch.is(':hover')) {
            handleHoverIn(); // Handle hover-in if still hovering
          }
        }, 700);
      }, 500);
    });

    $themeSwitch.prop('disabled', true); // Disable button temporarily
    setTimeout(() => {
      $themeSwitch.prop('disabled', false); // Re-enable after timeout
    }, 2000);
  };

  // Set transformations for specified elements
  const setTransformation = (element, rotation, scale, duration = '0.5s') => {
    $(element).css({
      transform: `rotate(${rotation}deg) scale(${scale})`,
      transition: `transform ${duration}`,
    });
  };

  // Handle hover-in/out effects
  const handleHoverIn = () => {
    if (!buttonClicked) {
      setTransformation($themeIcon, 360, 1);
      setTransformation($themeSwitch, 0, 1.2);
    }
  };

  const handleHoverOut = () => {
    if (!buttonClicked) {
      setTransformation($themeIcon, 0, 1);
      setTransformation($themeSwitch, 0, 1);
    }
  };

  // Set up the theme switch button with accessibility attributes and event handlers
  $themeSwitch
    .attr('role', 'button')
    .attr('aria-label', 'Switch Theme')
    .attr('tabindex', 0)
    .click(handleClick)
    .hover(handleHoverIn, handleHoverOut)
    .mouseleave(() => {
      if (!buttonClicked) {
        setTransformation($themeSwitch, 0, 1); // Reset scale on mouse leave
      }
    });

  // Initialize theme based on system preference
  const initialTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  applyTheme(initialTheme);

  // Set initial transformations for elements
  setTransformation($themeIcon, 0, 1);
  setTransformation($themeSwitch, 0, 1);
});
