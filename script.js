const input = document.querySelector(".input span");

let displayValue = "0";
let number1 = "";
let number2 = "";
let operator = "";
let total = 0;
let decimalEntered = false;

function updateYear() {
  const footer = document.querySelector("footer span");
  footer.append(" - " + new Date().getFullYear());
}

function updateDisplay() {
  displayValue = displayValue.toString().substring(0, 15);

  input.textContent = displayValue;
  input.style.fontSize = "60px";

  const divInput = document.querySelector("div.input");

  const maxDivWidth = divInput.clientWidth - 20; //? - 20 for padding

  let inputWidth = input.clientWidth;
  let originalFontSize = 60;

  while (inputWidth > maxDivWidth) {
    originalFontSize -= 1;
    input.style.fontSize = originalFontSize + "px";
    inputWidth = input.clientWidth;
  }
}

function clear() {
  displayValue = "0";
  number1 = "";
  number2 = "";
  operator = "";
  total = 0;
  decimalEntered = false;
  updateDisplay();
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
  return n1 / n2;
}

function resolve(n1, n2) {
  switch (operator) {
    case "+":
      return add(n1, n2);
    case "-":
      return subtract(n1, n2);
    case "*":
      return multiply(n1, n2);
    case "/":
      return divide(n1, n2);
    case "=":
    default:
      number1 = "";
      number2 = "";
      operator = "";
      displayValue = "";
      return total;
  }
}

function enterNumber(e) {
  const enteredValue = e.target.textContent;

  if (enteredValue === ".") {
    if (!decimalEntered) {
      if (displayValue === "") {
        displayValue = "0";
      }

      displayValue += enteredValue;
      decimalEntered = true;
      updateDisplay();
    }

    return;
  }

  if (!decimalEntered && (displayValue == 0 || displayValue === "" || operator === "=")) {
    displayValue = enteredValue;
  } else {
    displayValue += enteredValue;
  }

  updateDisplay();
}

function operate(e) {
  const selectedOperator = e.target.textContent;
  decimalEntered = false;

  if (number1 === "") {
    number1 = displayValue;
  } else if (number2 === "") {
    number2 = displayValue;
  }

  displayValue = "";

  if (selectedOperator === "=") {
    if (number2 == 0 && operator === "/") {
      clear();
      input.textContent = "Error!";
      return;
    }

    if (number1 === "" || number2 === "") {
      return;
    }

    total = resolve(parseFloat(number1), parseFloat(number2));
    displayValue = total;
    updateDisplay();
    number1 = "";
    number2 = "";
  } else {
    if (number1 !== "" && number2 !== "") {
      if (operator === "/" && number2 == 0) {
        clear();
        input.textContent = "Error!";
        return;
      }

      total = resolve(parseFloat(number1), parseFloat(number2));
      input.textContent = total;
      displayValue = "";
      number1 = total;
      number2 = "";
    }
  }

  operator = selectedOperator;
}

updateYear();

const numberButtons = [...document.querySelectorAll(".numbers button")];
numberButtons.forEach(button => button.addEventListener("click", enterNumber));

const operatorButtons = [...document.querySelectorAll(".operators button")];
operatorButtons.forEach(button => button.addEventListener("click", operate));

const clearButton = document.querySelector(".commands button");
clearButton.addEventListener("click", clear);
