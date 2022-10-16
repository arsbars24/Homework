let str = process.argv[2]

function Node(letter, freq, used, father, code) {
    this.letter = letter;
    this.freq = freq;
    this.used = used;
    this.father = father;
    this.code = code;
}

//code
let alph = new Array();  //create an array for making symbol-frequency pair
let tree = new Array(); 
 //tree contains objects (tree elements) 
for (let i = 0; i < str.length; i++) {
    alph[str.charAt(i)] = 0;
}
for (let i = 0; i < str.length; i++) {
    alph[str.charAt(i)]++;
}
console.log(alph); 
//make a symbol-frequency pair in array

for (i in alph) {
    let newNode = new Node(i, alph[i], 0, null, '0');
    tree.push(newNode);
} 
//make leaves in tree
console.log(tree);
treeLength = tree.length;
for (let i = 0; i < treeLength - 1; i++) {
    let mi1 = -1; //minimal index 1 and minimal index 2
    let mi2 = -2; // -1 because for m leaves account m - 1 nodes 
    let mf1 = str.length; // minimal frequency 1 and minimal frequency 2
    let mf2 = str.length;
    for (let i = 0; i < tree.length; i++) {
        if ((tree[i].used == 0) && (tree[i].freq <= mf2)) {
            mf1 = mf2;
            mi1 = mi2;
            mi2 = i;
            mf2 = tree[i].freq;
            } else if (tree[i].used == 0 && tree[i].freq <= mf1) {
            mf1 = tree[i].freq;
            mi1 = i;
        }
    }
        tree[mi1].used = 1;
        tree[mi2].used = 1;
        tree[mi1].father = tree.length;
        tree[mi2].father = tree.length;
        tree[mi1].code = '0';
        tree[mi2].code = '1';
        let newNode = new Node(tree[mi2].letter + tree[mi1].letter, tree[mi1].freq + tree[mi2].freq, 0, null, '');
        tree.push(newNode);
}// make nodes of tree
console.log(tree); 
for (let i = tree.length - 2; i > -1; i--) {
    tree[i].code = tree[tree[i].father].code + tree[i].code;
} //code symbols 
for (let i = 0; i < treeLength; i++) {
    console.log(tree[i].letter + " - " + tree[i].code)
} // print a table of coding  
let codedStr = '';
for (let i = 0; i < str.length; i++) {
    for (let j = 0; j < tree.length; j++) {
         if (str[i] == tree[j].letter) {
            codedStr += tree[j].code;
        }
    }
}
console.log(codedStr);

//decode
let decodedStr = '';
let codeOfChar = '';

for (let i = 0; i < codedStr.length; i++) {
    codeOfChar += codedStr[i];
    for (let j = 0; j < treeLength; j++) {
        if (codeOfChar == tree[j].code) {
            decodedStr += tree[j].letter;
            codeOfChar = '';
        }
    }
}

console.log(decodedStr);
