// Functional-Based
const displayUser = (
  { name = "n/a", age = "n/a", address = "n/a", city = "n/a", ...rest },
  output = console.log,
) => {
  let extraInfo = "";

  for (const key in rest) {
    extraInfo += `${key}: ${rest[key]}\n`;
  }

  output(`
User Information
Name   : ${name}
Age    : ${age}
Address: ${address}
City   : ${city}
${extraInfo}
`);
};

// Countdown function with default parameters for value, interval, and output function
const countdown = (value = 10, interval = 1000, output) => {
  return new Promise((resolve) => {
    let count = value;
    const timer = setInterval(() => {
      output(`Countdown: ${count}`);
      count--;

      if (count < 0) {
        clearInterval(timer); // Clear the interval when countdown is completed
        resolve();
      }
    }, interval);
  });
};

// Main function to run functional-based approach sequentially
const runFunctionalBased = async (user1, user2, output) => {
  const u1 = { ...user1 };
  const u2 = { ...user2 };

  // Countdown
  await countdown(10, 1000, output);

  // Show user1 right after countdown
  output("\nUser1 after countdown:");
  displayUser(u1, output);

  // Wait 5 seconds, then show user2
  await new Promise((resolve) => setTimeout(resolve, 5000));
  output("\nUser2 after 5 seconds:");
  displayUser(u2, output);
};

// Exporting the runFunctionalBased function to be used in app.js module
export { runFunctionalBased };
