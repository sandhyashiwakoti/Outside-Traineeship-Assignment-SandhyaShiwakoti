// wait for the page to fully load before running anything
window.addEventListener("load", function () {
  // tells the observer how many elements should be visible before animation plays
  var settings = {
    threshold: 0.1, // 10%
  };

  // create the observer
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      // check if the element is currently on screen
      if (entry.isIntersecting) {
        var el = entry.target;

        // animate each card one by one
        if (el.classList.contains("photo-grid")) {
          var cards = el.querySelectorAll(".card");

          // loop through each card and add a small delay so they don't appear at the same time
          cards.forEach(function (card, i) {
            // i is index (0,1,2...)
            var delayTime = i * 0.07;
            card.style.transitionDelay = delayTime + "s";

            // add show class so CSS transition plays
            card.classList.add("show");
          });
        } else {
          // for text, add show class directly without delay
          el.classList.add("show");
        }

        // stop watching after it has appeared
        observer.unobserve(el);
      }
    });
  }, settings);

  // watch all the photo grids
  var grids = document.querySelectorAll(".photo-grid");
  grids.forEach(function (grid) {
    observer.observe(grid);
  });

  // watch all the paragraphs separately
  var texts = document.querySelectorAll(".hidden-text");
  texts.forEach(function (text) {
    observer.observe(text);
  });
});
