// first get all the elements we need from the HTML
const modal = document.getElementById("modal");
const closeModalBtn = document.getElementById("close-modal");
const toast = document.getElementById("toast");
const itemCountNumber = document.getElementById("item-count-number");
const searchInput = document.getElementById("search-input");
const addInput = document.getElementById("add-input");
const addBtn = document.getElementById("add-btn");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear-btn");
const noResults = document.getElementById("no-results");

// -- Welcome Modal Popup --

// after page fully loads, wait 1 second then show the welcome popup
window.addEventListener(
  "load",
  function () {
    setTimeout(function () {
      modal.style.display = "flex"; // show the modal overlay
    }, 1000);
  },
  { once: true }, // we use { once: true } so this only runs one time ever
);

// when user clicks close, hide the modal
closeModalBtn.addEventListener("click", function () {
  modal.style.display = "none";
});

// -- Toast Message --

// this function shows a message for 2 seconds then hides it
function showToast(message) {
  toast.textContent = message; // put the message in the toast box
  toast.style.display = "block"; // make it visible

  // after 2 seconds, hide it again
  setTimeout(function () {
    toast.style.display = "none";
  }, 2000);
}

// -- Update Item count --

// this counts how many <li> are in the list and updates the text
function updateCount() {
  const total = itemList.querySelectorAll("li").length;
  itemCountNumber.textContent = total;

  // if list is empty, disable the clear button
  if (total === 0) {
    clearBtn.disabled = true;
  } else {
    clearBtn.disabled = false;
  }
}

// -- Add item --

// when user clicks the ADD ITEM button
addBtn.addEventListener("click", function () {
  // get what the user typed and remove extra spaces
  const text = addInput.value.trim();

  // if the input is empty, do nothing
  if (text === "") return;

  // create a new <li> element
  const newItem = document.createElement("li");
  newItem.textContent = text; // put the text inside

  // create a remove button for this item
  const removeBtn = document.createElement("button");
  removeBtn.textContent = "REMOVE";
  removeBtn.classList.add("remove-btn"); // add class so CSS can style it

  // put the remove button inside the <li>
  newItem.appendChild(removeBtn);

  // add the <li> to the list
  itemList.appendChild(newItem);

  // clear the input field so user can type a new one
  addInput.value = "";

  // update the count number
  updateCount();

  // show a message at the top
  showToast("Item added!");
});

// allow pressing Enter key to add item
addInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addBtn.click(); // this is like clicking the add button
  }
});

// -- Remove item (using Event Delegation) --

// instead of putting a listener on every button
// we put one listener on the <ul> and check what was clicked
itemList.addEventListener("click", function (event) {
  // check if what was clicked has the class 'remove-btn'
  if (event.target.classList.contains("remove-btn")) {
    // the parent of the button is the <li>, so we remove that
    const li = event.target.parentElement;
    itemList.removeChild(li);

    updateCount();
    showToast("Item removed!"); // show message
  }
});

// ---- Hover color effect (using Event Delegation) ----

// when mouse enters a list item, change its background color
itemList.addEventListener("mouseover", function (event) {
  if (event.target.tagName === "LI") {
    event.target.style.backgroundColor = "#e8e8e8";
  }
});

// when mouse leaves a list item, put the original color back
itemList.addEventListener("mouseout", function (event) {
  if (event.target.tagName === "LI") {
    event.target.style.backgroundColor = "#f9f9f9";
  }
});

// -- Clear all items --

clearBtn.addEventListener("click", function () {
  // remove all items by setting the list to empty
  itemList.innerHTML = "";

  updateCount(); // reset count to 0
  showToast("All items cleared!");
  noResults.style.display = "none"; // also hide no results message if showing
});

// -- Search/Filter (using Debounce) --

// debounce means wait until user stops typing before doing the search
// this avoids running the search on every single key press
function debounce(func, delay) {
  let timeoutId; // stores the timer

  return function (...args) {
    clearTimeout(timeoutId); // cancel the old timer every time user types

    // start a new timer - only runs after user stops typing for 500ms
    timeoutId = setTimeout(function () {
      func(...args);
    }, delay);
  };
}

// filter logic
function filterItems(event) {
  const searchText = event.target.value.toLowerCase(); // what user typed
  const allItems = itemList.querySelectorAll("li"); // get all list items
  let visibleCount = 0; // track how many items are showing

  allItems.forEach(function (item) {
    // get the text of the item (not including the button text)
    // we use firstChild which is the text node
    const itemText = item.firstChild.textContent.toLowerCase();

    // if the item text contains what user searched for, show it, otherwise hide it
    if (itemText.includes(searchText)) {
      item.style.display = "flex";
      visibleCount++;
    } else {
      item.style.display = "none";
    }
  });

  // if nothing matched, show the "No results found" message
  if (visibleCount === 0 && allItems.length > 0) {
    noResults.style.display = "block";
  } else {
    noResults.style.display = "none";
  }
}

// wrap filterItems in debounce with 500ms delay and attach to search box
searchInput.addEventListener("input", debounce(filterItems, 500));

// when the page loads first time, disable clear button since list is empty
updateCount();
