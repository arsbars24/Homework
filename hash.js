const fs = require("fs");
let subs = fs.readFileSync(process.argv[2],'utf8')
let text = fs.readFileSync(process.argv[3],'utf8')
let j, i, f;
let index = [];
let subhash = 0;
let fraghash = 0;
console.time();

for (i= 0; i < subs.length; i++){
    subhash += subs.charCodeAt(i);
}
if (subs.length > text.length){
    console.log("Substring is bigger than text");
}
else {
    i = 0;
    while (i < text.length - subs.length + 1){
        if (i == 0){
            for(f = i; f < i + subs.length; f++)
                fraghash += text.charCodeAt(f);
        } 
        else {
        f = i + subs.length - 1;
        fraghash = fraghash + text.charCodeAt(f) - text.charCodeAt(i - 1);
        }

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
        i++;        
    }
    
}
console.timeEnd();
console.log(index);