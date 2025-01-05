const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse the request body
app.use(express.urlencoded({ extended: true }));

// Function to calculate GCD using Euclidean algorithm
function gcd(a, b) {
  while (b !== 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

// Route to display the GCD form
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Calculate GCD</title>
      </head>
      <body>
        <h1>Calculate the GCD of Two Numbers</h1>
        <form action="/gcd" method="POST">
          <label for="num1">Number 1:</label>
          <input type="number" id="num1" name="num1" required><br><br>
          
          <label for="num2">Number 2:</label>
          <input type="number" id="num2" name="num2" required><br><br>
          
          <button type="submit">Calculate GCD</button>
        </form>
      </body>
    </html>
  `);
});

// Route to handle the form submission and calculate GCD
app.post('/gcd', (req, res) => {
  const num1 = parseInt(req.body.num1);
  const num2 = parseInt(req.body.num2);
  const result = gcd(num1, num2);

  res.send(`
    <html>
      <head>
        <title>GCD Result</title>
      </head>
      <body>
        <h1>Result of GCD Calculation</h1>
        <p>The GCD of ${num1} and ${num2} is: ${result}</p>
        <a href="/">Go back to the form</a>
      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
