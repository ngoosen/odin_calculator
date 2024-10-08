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

function clear() {
  displayValue = "0";
  number1 = "";
  number2 = "";
  operator = "";
  total = 0;
  decimalEntered = false;
  updateDisplay();
}

function updateDisplay() {
  displayValue = displayValue.toString();

  if (displayValue.includes(".")) {
    displayValue = displayValue.toString().substring(0, 15);
  } else if (displayValue.length > 15) {
    input.textContent = "Your number is too long.";
    input.style.fontSize = "19px";
    setTimeout(() => {
      clear();
    }, 2000);
    return;
  }

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
  let enteredValue = e;

  if (e.target && e.target.textContent) {
    enteredValue = e.target.textContent;
  }

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
  let selectedOperator = e;

  if (e.target && e.target.textContent) {
    selectedOperator = e.target.textContent;
  }

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

function backspace() {
  if (displayValue.length <= 1) {
    displayValue = "0";
  } else {
    displayValue = displayValue.substring(0, displayValue.length - 1);
  }

  updateDisplay();
}

const allowedKeys = ["Delete", "Backspace", "Enter", "/", "*", "-", "+", "=", ".", ","];

function keyboardDispatch(event) {
  const key = event.key;

  if (!isNaN(parseInt(key))) {
    enterNumber(event.key);
  } else if (allowedKeys.includes(key)) {
    switch (key) {
      case "Backspace":
        backspace();
        break;
      case ".":
      case ",":
        enterNumber(".");
        break;
      case "Enter":
        operate("=");
        break;
      case "/":
      case "*":
      case "-":
      case "+":
      case "=":
        operate(key);
        break;
      case "Delete":
      default:
        clear();
        break;
    }
  }
}

updateYear();

const numberButtons = [...document.querySelectorAll(".numbers button")];
numberButtons.forEach(button => button.addEventListener("click", enterNumber));

const operatorButtons = [...document.querySelectorAll(".operators button")];
operatorButtons.forEach(button => button.addEventListener("click", operate));

const clearButton = document.querySelector(".commands button");
clearButton.addEventListener("click", clear);

const backspaceButton = document.querySelector(".commands i");
backspaceButton.addEventListener("click", backspace);

document.addEventListener("keydown", keyboardDispatch);
