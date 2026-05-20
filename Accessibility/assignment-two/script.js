// take all main nav links from the DOM
const navLinks = document.querySelectorAll(".main-menu a");

// add click event listener to each link
navLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    // first remove active style from all links
    navLinks.forEach(function (elem) {
      elem.style.color = "";
      elem.style.fontWeight = "";
    });

    // add active style to the one that was clicked
    link.style.color = "#c4541a";
    link.style.fontWeight = "bold";
  });
});
