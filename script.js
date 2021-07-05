class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = String(this.currentOperand) - String(number);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = String(this.currentOperand) + String(number);
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
    this.previousOperand = `${this.previousOperand} ${operation}`
  }

  compute() {
      let computation
      const prev = parseFloat(this.previousOperand)
      const current = parseFloat(this.currentOperand)
      if (isNaN(prev) || isNaN(current)) return
      switch (this.operation) {
          case '+':
              computation = prev + current
              break
          case '-':
              computation = prev - current
              break
          case '*':
              computation = prev * current
              break
          case '÷':
              computation = prev / current
              break
        default:
                return
      }
      this.currentOperand = computation
      this.operatation = undefined
      this.previousOperand = ''
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand;
    this.previousOperandTextElement.innerText = this.previousOperand;
  }
}

const numberButtons = document.querySelectorAll("[number]");
const operationButtons = document.querySelectorAll("[operation]");
const equalsButton = document.querySelector("[equals]");
const deleteButton = document.querySelector("[delete]");
const allClearButton = document.querySelector("[all-clear]");
const previousOperandTextElement = document.querySelector("[previous-operand]");
const currentOperandTextElement = document.querySelector("[current-operand]");
const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
}

deleteButton.addEventListener("click", () => calculator.delete());
