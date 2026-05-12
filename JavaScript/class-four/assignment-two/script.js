// both boxes from the DOM
const box1 = document.getElementById("box1");
const box2 = document.getElementById("box2");

// --- box 1: rotate only once ---
const observer1 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // add rotation when visible
      box1.classList.add("rotated");

      // stop observing - don't trigger this again
      observer1.unobserve(box1);
    }
  });
});

// start observing box1
observer1.observe(box1);

// --- box 2: rotate every time it enters viewport, reset when it leaves ---
const observer2 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // box entered viewport - rotate
      box2.classList.add("rotated");
    } else {
      // box left viewport - reset back to original
      box2.classList.remove("rotated");
    }
  });
});

// start observing box2
observer2.observe(box2);
