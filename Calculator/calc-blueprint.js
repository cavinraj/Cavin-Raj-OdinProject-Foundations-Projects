export class Calculator {
    constructor(parameters) {
        
    }

    static add(a,b) {
        return a + b
    }

    static subtract(a,b) {
        return a - b
    }

    static multiply(a,b) {
        return a * b
    }

    static divide(a,b) {
        return a / b
    }
    
    static exp(a,b) {
        return a ** b
    }

    static operate(operator,operand1,operand2) {
        switch (operator) {
            case '+':
                return this.add(operand1,operand2)
        
            case '-':
                return this.subtract(operand1,operand2)
            
            case 'x':
                return this.multiply(operand1,operand2)

            case '÷':
                return this.divide(operand1,operand2)
            
            default:
                return null
        }
    }
}
