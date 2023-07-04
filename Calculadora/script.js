const previousOperationText = document.querySelector("#previous_operation")
const currentOperationText = document.querySelector("#current_operation")
const buttons = document.querySelectorAll("#buttons_container button")

class Calculator {
	constructor(previousOperationText, currentOperationText) {
		this.previousOperationText = previousOperationText
		this.currentOperationText = currentOperationText
		this.currentOperation = ""
	}

	//adiciona digito na tela da calculadora
	addDigit(digit) {
		//checar se a operação tem "."
		if (digit === "." && this.currentOperationText.innerText.includes(".")) {
			return
		}

		this.currentOperation = digit
		this.updateScreen()
	}

	//Processo dos cálculos da calculadora
	processOperation(operation) {
		//Chegagem se o current value está vazio (para conseguir mudar operação)
		if (this.currentOperationText.innerText === "" && operation !== "C") {
			if (this.previousOperationText.innerText !== "") {
				//Mudança de operação
				this.changeOperation(operation)
			}
			return
		}

		//Pegar o atual e valores anteriores
		let operationValue
		const previous = +this.previousOperationText.innerText.split(" ")[0]
		const current = +this.currentOperationText.innerText

		switch (operation) {
			case "+":
				operationValue = previous + current
				this.updateScreen(operationValue, operation, current, previous)
				break
			case "-":
				operationValue = previous - current
				this.updateScreen(operationValue, operation, current, previous)
				break
			case "*":
				operationValue = previous * current
				this.updateScreen(operationValue, operation, current, previous)
				break
			case "/":
				operationValue = previous / current
				this.updateScreen(operationValue, operation, current, previous)
				break
			case "Del":
				this.processDelOperator()
				break
			case "CE":
				this.processClearCurrentOperation()
				break
			case "C":
				this.processClearAllOperation()
			case "=":
				this.processEqualOperator()
			default:
				return
		}
	}

	//Mudança de valores na tela
	updateScreen(
		operationValue = null,
		operation = null,
		current = null,
		previous = null
	) {
		if (operationValue === null) {
			this.currentOperationText.innerText += this.currentOperation
		} else {
			//checagem se o valor é ZERO, se for basta somar o current value
			if (previous === 0) {
				operationValue = current
			}

			//Colocar o valor atual (current) para cima (previous)
			this.previousOperationText.innerText = `${operationValue} ${operation}`
			this.currentOperationText.innerText = ""
		}
	}

	//Mudança de operação
	changeOperation(operation) {
		const mathOperations = ["*", "/", "+", "-"]
		if (!mathOperations.includes(operation)) {
			return
			//aborta a logica caso não receba o comando do usuário de clicar nas operações
		}

		this.previousOperationText.innerText =
			this.previousOperationText.innerText.slice(0, -1) + operation
		//-1 para apagar o ultimo caracter que é o sinal da operação
	}

	//Apagar o ultimo digito
	processDelOperator() {
		this.currentOperationText.innerText =
			this.currentOperationText.innerText.slice(0, -1)
	}

	//Apagar a operação atual
	processClearCurrentOperation() {
		this.currentOperationText.innerText = ""
	}

	//Apagar todas as operações

	processClearAllOperation() {
		this.currentOperationText.innerText = ""
		this.previousOperationText.innerText = ""
	}

	processEqualOperator() {
		const operation = previousOperationText.innerText.split(" ")[1]
		this.processOperation(operation)
	}
}

const calc = new Calculator(previousOperationText, currentOperationText)

buttons.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		const value = e.target.innerText

		if (+value >= 0 || value === ".") {
			calc.addDigit(value)
		} else {
			calc.processOperation(value)
		}
	})
})
