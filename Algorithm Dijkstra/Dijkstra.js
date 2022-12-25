const fs = require("fs");
let expr = fs.readFileSync(process.argv[2], 'utf-8'); // expression

//let expr = '(2+3)^2^8-(6+7)/2';
console.log('Input expression: ', expr);

let output_expr = '';
let stack = new Array();

function priority(symb){
	if (symb == '(' || symb == ')'){
		return 1
    }
	else if (symb == '+' || symb == '-'){
		return 2
    }
	else if (symb == '*' || symb == '/'){
		return 3
    }
	else if (symb == '^'){
		return 4
    }
	else return 0 
}

for (let i = 0; i < expr.length; i++){
	let symb = expr[i];

    if (symb == ' '){
        continue;
    }
	else if (priority(symb) == 0){
		output_expr += symb;
    }
	else if (symb == '('){
		stack.push('(');
    }
	else if (symb == ')'){
		while (stack[stack.length - 1] != '(')
			output_expr += stack.pop();
		stack.pop();
	}
	else {
		while (priority(symb) <= priority(stack[stack.length - 1]))
			output_expr += stack.pop();
		stack.push(symb);
	}
}

stack_len = stack.length;
if (stack_len > 0){
	for (i = 0; i < stack_len; i++){
		output_expr += stack.pop();
	}
}

console.log('Output expression: ', output_expr)