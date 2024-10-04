const input = document.querySelector(".input span");

let displayValue = "0";
let number1 = "";
let number2 = "";
let operator = "";
let total = 0;

function updateYear() {
  const footer = document.querySelector("footer span");
  footer.append(" - " + new Date().getFullYear());
}

function clear() {
  number1 = "";
  number2 = "";
  operator = "";
  total = 0;
  displayValue = "0";
  input.textContent = displayValue;
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
  if (displayValue == 0 || displayValue === "" || operator === "=") {
    displayValue = e.target.textContent;
  } else {
    displayValue += e.target.textContent;
  }

  input.textContent = displayValue;
}

function operate(e) {
  const selectedOperator = e.target.textContent;

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

    total = resolve(parseInt(number1), parseInt(number2));
    displayValue = total;
    input.textContent = displayValue;
    number1 = "";
    number2 = "";
  } else {
    if (number1 !== "" && number2 !== "") {
      if (operator === "/" && number2 == 0) {
        clear();
        input.textContent = "Error!";
        return;
      }

      total = resolve(parseInt(number1), parseInt(number2));
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
