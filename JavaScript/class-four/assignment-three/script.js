// containers from the HTML
const app = document.getElementById("app");
const boxContainer = document.getElementById("boxContainer");

// list of different colors
const colors = [
  "#f47c7c",
  "#f5a623",
  "#2ecc71",
  "#4a90d9",
  "#9b59b6",
  "#e91e8c",
  "#1abc9c",
  "#607d8b",
];

// keep track of boxes that have been added
let boxCount = 0;

// set MutationObserver to observe changes in the #app container
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    // go through each added node
    mutation.addedNodes.forEach((node) => {
      // check if node is "Add Box" button
      if (node.id === "addBoxBtn") {
        // attach the click listener
        node.addEventListener("click", () => {
          // create a new box div
          const box = document.createElement("div");
          box.classList.add("box");

          // pick a color from the list
          box.style.backgroundColor = colors[boxCount % colors.length];
          // boxCount = 0  →  0 % 8 = 0  →  colors[0]  → #f47c7c
          // boxCount = 1  →  1 % 8 = 1  →  colors[1]  → #f5a623
          // boxCount = 2  →  2 % 8 = 2  →  colors[2]  → #2ecc71

          // loops back to start of colors array when we run out of colors
          // boxCount = 8  →  8 % 8 = 0  →  colors[0]  → #f47c7c
          // boxCount = 9  →  9 % 8 = 1  →  colors[1]  → #f5a623

          boxCount++;

          // add box to the container
          boxContainer.appendChild(box);
        });
      }
    });
  });
});

// start observing #app for direct child additions
observer.observe(app, {
  childList: true,
});

// after 2 seconds, dynamically create and add the button
setTimeout(() => {
  const addBoxBtn = document.createElement("button");
  addBoxBtn.id = "addBoxBtn";
  addBoxBtn.textContent = "Add Box";
  // add button before boxContainer so it appears at top
  app.insertBefore(addBoxBtn, boxContainer);
}, 2000);
