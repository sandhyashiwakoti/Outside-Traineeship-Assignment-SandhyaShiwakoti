// --- Task 1: FizzBuzz  ---
const fizzbuzz = document.getElementById("fizzbuzz-box");
// Iterate over 1 to 100 numbers
for (let i = 1; i <= 100; i++) {
  let word = "";
  // Check multiples of both 3 and 5 first and keep word as FizzBuzz
  if (i % 3 === 0 && i % 5 === 0) {
    word = "FizzBuzz";
    // if multiples of 3 only, then Fizz
  } else if (i % 3 === 0) {
    word = "Fizz";
    // if multiples of 5 only, then Buzz
  } else if (i % 5 === 0) {
    word = "Buzz";
    // if not multiples of either 3 or 5, then keep the number itself as word
  } else {
    word = i;
  }

  // Add comma and space after each word except the last one
  let result = word + (i < 100 ? ", " : "");

  // Append the result to the fizzbuzz box in HTML
  fizzbuzz.textContent += result;
}

// --- Task 2: Array  ---
const nums = [5, 12, 8, 130, 44];

// Sum of numbers using different methods - For Loop, Map, Filter, Reduce
let sumFor = 0;
for (let i = 0; i < nums.length; i++) {
  sumFor += nums[i];
}

let sumMap = 0;
nums.map((n) => (sumMap += n));

let sumFilter = 0;
nums.filter((n) => {
  sumFilter += n;
  return true;
});

let sumReduce = nums.reduce((a, b) => a + b, 0);

// Display the sums in respective HTML elements
document.getElementById("sum-for").textContent = sumFor;
document.getElementById("sum-map").textContent = sumMap;
document.getElementById("sum-filter").textContent = sumFilter;
document.getElementById("sum-reduce").textContent = sumReduce;

// Average of numbers using different methods - For Loop, Map, Filter, Reduce
let avg = sumReduce / nums.length;

let avgFor = 0;
let totalAverage = 0;
for (let i = 0; i < nums.length; i++) {
  totalAverage += nums[i];
}
avgFor = totalAverage / nums.length;

let avgMap = 0;
nums.map((n) => (avgMap += n / nums.length));

let avgFilter = nums.filter(() => true).reduce((a, b) => a + b) / nums.length;

let avgReduce = nums.reduce((a, b, i, arr) => a + b / arr.length, 0);

// Display the averages in respective HTML elements, rounded to 2 decimal places
document.getElementById("avg-for").textContent = avgFor.toFixed(2);
document.getElementById("avg-map").textContent = avgMap.toFixed(2);
document.getElementById("avg-filter").textContent = avgFilter.toFixed(2);
document.getElementById("avg-reduce").textContent = avgReduce.toFixed(2);

// Maximum number using different methods - For Loop, Map, Filter, Reduce
let maxFor = nums[0];
for (let i = 0; i < nums.length; i++) {
  if (nums[i] > maxFor) maxFor = nums[i];
}

let maxMap = -Infinity;
nums.map((n) => {
  if (n > maxMap) maxMap = n;
});

let maxFilter = nums.filter((n) => n === Math.max(...nums))[0];

let maxReduce = nums.reduce((a, b) => (a > b ? a : b));

// Display the maximum numbers in respective HTML elements
document.getElementById("max-for").textContent = maxFor;
document.getElementById("max-map").textContent = maxMap;
document.getElementById("max-filter").textContent = maxFilter;
document.getElementById("max-reduce").textContent = maxReduce;

// Minimum number using different methods - For Loop, Map, Filter, Reduce
let minFor = nums[0];
for (let i = 0; i < nums.length; i++) {
  if (nums[i] < minFor) minFor = nums[i];
}

let minMap = Infinity;
nums.map((n) => {
  if (n < minMap) minMap = n;
});

let minFilter = nums.filter((n) => n === Math.min(...nums))[0];

let minReduce = nums.reduce((a, b) => (a < b ? a : b));

// Display the minimum numbers in respective HTML elements
document.getElementById("min-for").textContent = minFor;
document.getElementById("min-map").textContent = minMap;
document.getElementById("min-filter").textContent = minFilter;
document.getElementById("min-reduce").textContent = minReduce;

// Count of even numbers using different methods - For Loop, Map, Filter, Reduce
let evenFor = 0;
for (let i = 0; i < nums.length; i++) {
  if (nums[i] % 2 === 0) evenFor++;
}

let evenMap = 0;
nums.map((n) => {
  if (n % 2 === 0) evenMap++;
});

let evenFilter = nums.filter((n) => n % 2 === 0).length;

let evenReduce = nums.reduce((acc, n) => (n % 2 === 0 ? acc + 1 : acc), 0);

// Display the count of even numbers in respective HTML elements
document.getElementById("even-for").textContent = evenFor;
document.getElementById("even-map").textContent = evenMap;
document.getElementById("even-filter").textContent = evenFilter;
document.getElementById("even-reduce").textContent = evenReduce;

// Numbers above average using different methods - For Loop, Map, Filter, Reduce
let aboveFor = [];
for (let i = 0; i < nums.length; i++) {
  if (nums[i] > avg) aboveFor.push(nums[i]);
}
let aboveMap = [];
nums.map((n) => {
  if (n > avg) aboveMap.push(n);
});
let aboveFilter = nums.filter((n) => n > avg);
let aboveReduce = nums.reduce((acc, n) => (n > avg ? [...acc, n] : acc), []);

// Display the numbers above average in respective HTML elements
document.getElementById("above-for").textContent = aboveFor.join(", ");
document.getElementById("above-map").textContent = aboveMap.join(", ");
document.getElementById("above-filter").textContent = aboveFilter.join(", ");
document.getElementById("above-reduce").textContent = aboveReduce.join(", ");
