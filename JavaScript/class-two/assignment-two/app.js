// Importing class and function from js files
import { DisplayUser } from "./class-based.js";
import { runFunctionalBased } from "./functional-based.js";

// User information objects
const user1 = {
  name: "Harry",
  age: 24,
  address: "Jhamsikhel",
  city: "Lalitpur",
};
const user2 = { name: "Ram", address: "Boudha", city: "Kathmandu" };

// Get output elements from HTML document to display in dom
const classOutput = document.getElementById("class-output");
const functionalOutput = document.getElementById("functional-output");

// Output function to print messages in both console and HTML document
const output = (approach) => (message) => {
  console.log(message);
  approach.textContent += `${message}\n`;
};

// Main function to run class-based and functional-based approach in parallel
function start() {
  const classDisplay = new DisplayUser(1000, output(classOutput));
  classDisplay.runClassBased(user1, user2);
  runFunctionalBased(user1, user2, output(functionalOutput));
}
start();
