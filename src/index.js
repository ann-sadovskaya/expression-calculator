function eval() {
    // Do not use eval!!!
    return;
}

const op = [
    {'*': (a, b) => a * b, '/': (a, b) => a / b},
    {'+': (a, b) => a + b, '-': (a, b) => a - b}
]

function expressionCalculator(expr) {
    validateExpr(expr);
    expr = expr.replace(/\s/g, "").replace(/(\*|\/|\+|\-)/g, "`$&`");
    if (expr.match(/\(/g)){
        for (let i = expr.match(/\(/g).length; i != 0; i--) {
            let calculation = expr.match(/(\([0-9\+\/\*\-.`]+\))/g)[0];
            let expression = calculation.slice( 1, calculation.length-1 );
            expr = expr.replace(calculation, calculate(expression));
        }
    }
    return calculate(expr);
}

function validateExpr(expr){
    expr = expr.split(" ").filter(e => e != "").join("");
    let openBrackets = expr.match(/\(/g);
    let closeBrackets = expr.match(/\)/g);
    let openBracketsCount = openBrackets ? openBrackets.length : 0;
    let closeBracketsCount = closeBrackets ? closeBrackets.length : 0;
    if (openBracketsCount != closeBracketsCount){
        throw new Error("ExpressionError: Brackets must be paired");
    }
    if (expr.includes("/0") ) {
        throw new Error("TypeError: Division by zero.");
    }
}

function calculate(expr) {
    let elements = expr.split("`");
    for(let i = 0; i < op.length; i++){
        for(let j = 1; j < elements.length - 1; j++){
            if (op[i][elements[j]]){
                elements[j] = op[i][elements[j]](+elements[j-1], +elements[j+1]);
                elements.splice(j-1, 3, elements[j]);
                j--;
            }
        }
    }
    return +elements[0];
}

module.exports = {
    expressionCalculator
}