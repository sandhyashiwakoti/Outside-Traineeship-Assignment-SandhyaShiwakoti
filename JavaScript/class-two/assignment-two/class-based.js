// Class-Based
class DisplayUser {
  // Constructor with default parameters for interval and output function
  // Instead of fixed console.log, used output so we can print in console and HTML
  constructor(interval = 1000, output = console.log) {
    this.interval = interval;
    this.output = output;
  }

  // Method to display user information using destructuring and rest parameters
  // Default values are set to "n/a" if not provided
  displayUser({
    name = "n/a",
    age = "n/a",
    address = "n/a",
    city = "n/a",
    ...rest
  }) {
    let extraInfo = "";

    for (const key in rest) {
      extraInfo += `${key}: ${rest[key]}\n`;
    }
    this.output(`
User Information
Name   : ${name}
Age    : ${age}
Address: ${address}
City   : ${city}
${extraInfo}
`);
  }

  // Countdown method that returns a promise which resolves after counting from the given value
  countdown(value = 10) {
    return new Promise((resolve) => {
      let count = value;

      // setInterval runs every this.interval milliseconds, printing the countdown value and decrementing count
      const timer = setInterval(() => {
        this.output(`Countdown: ${count}`);
        count--;

        if (count < 0) {
          clearInterval(timer); // Clear the interval when countdown is completed
          resolve();
        }
      }, this.interval);
    });
  }

  // Method to run class-based approach sequentially
  async runClassBased(user1, user2) {
    const u1 = { ...user1 };
    const u2 = { ...user2 };

    // Countdown
    await this.countdown();

    // Show user1 right after countdown
    this.output("\n User1 after countdown:");
    this.displayUser(u1);

    // Wait 5 seconds, then show user2
    await new Promise((resolve) => setTimeout(resolve, 5000));
    this.output("\n User2 after 5 seconds:");
    this.displayUser(u2);
  }
}

// Exporting the DisplayUser class to be used in app.js modules
export { DisplayUser };
