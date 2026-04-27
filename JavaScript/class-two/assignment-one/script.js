// Original array of fruits
const fruits = [
  "apple",
  "banana",
  "cherry",
  "grape",
  "mango",
  "papaya",
  "guava",
  "kiwi",
];

const originalFruits = [...fruits];
console.log("Before:", originalFruits);

// Using splice to remove 3 fruits starting from index 4 and add 5 new fruits in their place
fruits.splice(
  4, // Starting index
  3, // Number of elements to remove
  "strawberry",
  "blueberry",
  "watermelon",
  "orange",
  "blackberry",
);

// Creating a new array to store the modified fruits
const modifiedFruits = [...fruits];
console.log("After :", modifiedFruits);

// Displaying the original and modified arrays in the HTML document
const originalArray = document.getElementById("original-array");
originalArray.textContent = originalFruits.join(", ");

const modifiedArray = document.getElementById("modified-array");
modifiedArray.textContent = modifiedFruits.join(", ");
