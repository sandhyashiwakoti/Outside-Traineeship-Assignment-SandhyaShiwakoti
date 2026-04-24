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
  if (approach) {
    approach.textContent += `${message}\n`;
  }
};

// Main function to run class-based and functional-based approach sequentially
const start = async () => {
  const classDisplay = new DisplayUser(1000, output(classOutput));
  await classDisplay.runClassBased(user1, user2);
  await runFunctionalBased(user1, user2, output(functionalOutput));
};

start();
