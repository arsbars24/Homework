const fs = require("fs");
let subs = fs.readFileSync(process.argv[2],'utf8')
let text = fs.readFileSync(process.argv[3],'utf8')
let j, i;
let index = [];
if (subs.length > text.length){
    console.log("Substring is bigger than text");
    
} else {
    console.time();
    i = 0;
    textsliding:
    while (i < text.length - subs.length + 1){
        j = 0;
        subscompare:
        while (text[i + j] == subs[j]){
            j++;
            if (j == subs.length){
                index.push(i + 1);
                break;
            }
  
        }
        i++;
    }
        
    console.timeEnd();
    console.log(index);

}

