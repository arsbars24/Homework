const fs = require('fs');
const readline = require('readline-sync');

let prog = process.argv[2];
let mem = fs.readFileSync(prog).toString().split(/[ , \n]/); //making a memory


for (let i = 0; i < mem.length; i++) {
    console.log(i, mem[i]);
}
var vars = new Array(); // variables
var keys = new Array(); // keys for indication
let ip = 0;
let bFlag = true; // for while cycle
let bIfFlag = false; // for memory traffic
while (bFlag) {
    if (bIfFlag && mem[ip] != "end\r") {
        ip += 1;
        continue
    }
    switch (mem[ip]) {

        case 'input':
            vars[mem[ip + 1].substring(0, mem[ip + 1].length - 1)] = parseFloat(readline.question("\nPrint input:\n"));
            ip += 2;
            break;
        case 'set':
            vars[mem[ip + 1]] = parseFloat(mem[ip + 2]);
            ip += 3;
            break;
        case 'output':
            console.log(vars[mem[ip + 1].substring(0, mem[ip + 1].length - 1)]);
            ip += 2;
            break
        case 'add':
            if (mem[ip + 1].startsWith('$')) {
                if (mem[ip + 2].startsWith('$')) {
                    vars[mem[ip + 3].substring(0, mem[ip + 3].length - 1)] = vars[mem[ip + 1]] + vars[mem[ip + 2]];
                } else {
                    vars[mem[ip + 3].substring(0, mem[ip + 3].length - 1)] = vars[mem[ip + 1]] + parseFloat(mem[ip + 2]);
                }
            } else {
                if (mem[ip + 2].startsWith('$')) {
                    vars[mem[ip + 3].substring(0, mem[ip + 3].length - 1)] = parseFloat(mem[ip + 1]) + vars[mem[ip + 2]];
                } else {
                    vars[mem[ip + 3].substring(0, mem[ip + 3].length - 1)] = parseFloat(mem[ip + 1]) + parseFloat(mem[ip + 2]);
                }
            }
            ip += 4;
            break;
        case 'minus':
            if (mem[ip + 1].startsWith('$')) {
                if (mem[ip + 2].startsWith('$')) {
                    vars[mem[ip + 3].substring(0, mem[ip + 3].length - 1)] = vars[mem[ip + 1]] - vars[mem[ip + 2]];
                } else {
                    vars[mem[ip + 3].substring(0, mem[ip + 3].length - 1)] = vars[mem[ip + 1]] - parseFloat(mem[ip + 2]);
                }
            } else {
                if (mem[ip + 2].startsWith('$')) {
                    vars[mem[ip + 3].substring(0, mem[ip + 3].length - 1)] = parseFloat(mem[ip + 1]) - vars[mem[ip + 2]];
                } else {
                    vars[mem[ip + 3].substring(0, mem[ip + 3].length - 1)] = parseFloat(mem[ip + 1]) - parseFloat(mem[ip + 2]);
                }
            }
            ip += 4;
            break;
        case 'mult':
            if (mem[ip + 1].startsWith('$')) {
                if (mem[ip + 2].startsWith('$')) {
                    vars[mem[ip + 3].substring(0, mem[ip + 3].length - 1)] = vars[mem[ip + 1]] * vars[mem[ip + 2]];
                } else {
                    vars[mem[ip + 3].substring(0, mem[ip + 3].length - 1)] = vars[mem[ip + 1]] * mem[ip + 2];
                }
            } else {
                if (mem[ip + 2].startsWith('$')) {
                    vars[mem[ip + 3].substring(0, mem[ip + 3].length - 1)] = mem[ip + 1] * vars[mem[ip + 2]];
                } else {
                    vars[mem[ip + 3].substring(0, mem[ip + 3].length - 1)] = mem[ip + 1] * mem[ip + 2];
                }
            }
            ip += 4
            break
        case 'INE':
            bIfFlag = vars[mem[ip + 1]] == vars[mem[ip + 2].substring(0, mem[ip + 2].length - 1)];
            ip += 3;
            break;
        case 'end\r':
            bIfFlag = false;
            ip += 1;
            break;
        case 'key':
            keys[mem[ip + 1]] = ip + 2;
            ip += 2;
            break;
        case 'jmp':
            ip = keys[mem[ip + 1]]
            break;
        case 'exit':
            bFlag = false;
    }
}