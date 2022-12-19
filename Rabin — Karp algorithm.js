const fs = require("fs");
let subs = fs.readFileSync(process.argv[2],'utf8')
let text = fs.readFileSync(process.argv[3],'utf8')
let j, i;
let subhash = 0
let fraghash = 0;
let index = [];
if (subs.length > text.length){
    console.log("Substring is bigger than text");
    
} else {
    console.time();
    for (i = 0; i < subs.length; i++){
        subhash += subs.charCodeAt(i) ** Math.pow(2, subs.length - i - 1);
        fraghash += text.charCodeAt(i) ** Math.pow(2, subs.length - i - 1);
    }
    for (i = 0; i < text.length - subs.length + 1; i++){
        if (subhash == fraghash){
            j = 0;
            while (text[i + j] == subs[j])
            {
                j++;
                if (j == subs.length){
                    index.push(i + 1);
                    break;  
                }
                    
                              
            }
        }
        fraghash = (fraghash - text.charCodeAt(i) * Math.pow(2, subs.length - 1) * 2 + text.charCodeAt(i + subs.length - 1));
    }
    

}
console.timeEnd();
console.log(index);