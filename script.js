const input = document.querySelector(".input span");

let displayValue = "0";
let numbers = [];
let operator = "";
let total = 0;

function updateYear() {
  const footer = document.querySelector("footer span");
  footer.append(" - " + new Date().getFullYear());
}

function add(n1, n2) {
  return n1 + n2;
}

function subtract(n1, n2) {
  return n1 - n2;
}

function multiply(n1, n2) {
  return n1 * n2;
}

function divide(n1, n2) {
  if (n2 == 0) {
    // throw error
    return;
  }

  return n1 / n2;
}

function enterNumber(e) {
  if (displayValue == 0) {
    displayValue = e.target.textContent;
  } else {
    displayValue += e.target.textContent;
  }

  input.textContent = displayValue;
}

function operate(e) {
  numbers.push(parseInt(displayValue));
  displayValue = "0";

  if (e.target.textContent === "=") {
    let n1 = numbers[0];
    let n2 = numbers[1];

    if (!n2) {
      n2 = 0;
    }

    switch (operator) {
      case "+":
        total = add(n1, n2);
        break;
      case "-":
        total = subtract(n1, n2);
        break;
      case "*":
        total = multiply(n1, n2);
        break;
      case "/":
        total = divide(n1, n2);
        break;
      default:
        break;
    }

    displayValue = "0";
    input.textContent = total;
    numbers = [];
  } else {
    operator = e.target.textContent;
  }
}

updateYear();

const numberButtons = [...document.querySelectorAll(".numbers button")];
numberButtons.forEach(button => button.addEventListener("click", enterNumber));

const operatorButtons = [...document.querySelectorAll(".operators button")];
operatorButtons.forEach(button => button.addEventListener("click", operate));
