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
    this.currentOperand = String(this.currentOperand).slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    if (number === "+/-") return this.currentOperand = '-' + String(this.currentOperand);
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
    // this.previousOperand = `${this.previousOperand} ${operation}`;
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
      const stringNumber = String(number)
      const integerNumber = parseFloat(stringNumber.split('.')[0])
      const decimalNumber = stringNumber.split('.')[1]
     let integerDisplay
     if (isNaN(integerNumber)) {
         integerDisplay = ''
     } else {
         integerDisplay = integerNumber.toLocaleString('en', {maximumFractionDigits: 0})
     }
     if (decimalNumber != null) {
        return `${integerDisplay}.${decimalNumber}`
     } else {
         return integerDisplay
     }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
    if (this.operation != null) {
       this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
        this.previousOperandTextElement.innerText = ''
    }
    // this.previousOperandTextElement.innerText = this.getDisplayNumber(previousOperand);
  }
}

const numberButtons = document.querySelectorAll("[number]");
const operationButtons = document.querySelectorAll("[operation]");
const signButton = document.querySelector('[sign]')
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

signButton.addEventListener('click', ()=> {
    calculator.appendNumber(signButton.innerText);
    calculator.updateDisplay();
})

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
