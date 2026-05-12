// elements from the DOM
const toggleBtn = document.getElementById("toggleBtn");
const offcanvas = document.getElementById("offcanvas");

// throttle function - only allows function to run once every 'limit' ms
function throttle(func, limit) {
  let lastRan;
  let lastFunc;

  return function (...args) {
    if (!lastRan) {
      // first click - run immediately
      func(...args);
      lastRan = Date.now();
    } else {
      // clear any queued call
      clearTimeout(lastFunc);

      // schedule a call only if enough time has passed
      lastFunc = setTimeout(
        () => {
          if (Date.now() - lastRan >= limit) {
            func(...args);
            lastRan = Date.now();
          }
        },
        limit - (Date.now() - lastRan),
      );
    }
  };
}

// toggle logic
function toggleMenu() {
  const isOpen = offcanvas.classList.contains("open");

  if (isOpen) {
    // close menu
    offcanvas.classList.remove("open");
    toggleBtn.classList.remove("open");
  } else {
    // open menu
    offcanvas.classList.add("open");
    toggleBtn.classList.add("open");
  }
}

// wrap toggle with throttle - max once every 500ms
const throttledToggle = throttle(toggleMenu, 500);

// attach throttled toggle to button
toggleBtn.addEventListener("click", throttledToggle);
