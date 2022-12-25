const fs = require('fs');

function getAlphFreq() {
    let alphabet_frequency = new Array();
    let alphabet = fs.readFileSync('alphabet.txt', 'utf8').split('\r\n');
    for (let i = 0; i < alphabet.length; i++) {
        let letter = alphabet[i].split(' ')[0];
        let frequency = alphabet[i].split(' ')[1];
        alphabet_frequency[letter] = parseFloat(frequency);
    }
    return alphabet_frequency;
}

function getCipherFreq(cipher) {
    let cipher_frequency = new Array();
    for (let i = 0; i < 26; i++){
        cipher_frequency[String.fromCharCode('a'.charCodeAt(0) + i)] = 0;
    }
    let count = 0;
    for (let i = 0; i < cipher.length; i++) {
        let symbol = cipher[i].toLowerCase();
        if (symbol.charCodeAt(0) < 'a'.charCodeAt(0) || symbol.charCodeAt(0) > 'z'.charCodeAt(0))
            continue;
        cipher_frequency[symbol]++;
        count++;
    }

    for (let i = 0; i < 26; i++)
        cipher_frequency[String.fromCharCode('a'.charCodeAt(0) + i)] =
            cipher_frequency[String.fromCharCode('a'.charCodeAt(0) + i)]
            / count
            * 100;

    return cipher_frequency;
}

function getDiff(alphabet_frequency, cipher_frequency, shift) {
    let sum = 0
    for (let i = 0; i < 26; i++)
        sum += Math.pow(
            alphabet_frequency[String.fromCharCode('a'.charCodeAt(0) + i)]
            - cipher_frequency[String.fromCharCode('a'.charCodeAt(0) + (i + shift) % 26)], 2);
    return sum;
}

function detShift(alphabet_frequency, cipher_frequency) {
    let shift = 0;
    let min_diff = getDiff(alphabet_frequency, cipher_frequency, 0);
    for (let i = 1; i < 26; i++) {
        let curr_diff = getDiff(alphabet_frequency, cipher_frequency, i);
        if (curr_diff < min_diff) {
            min_diff = curr_diff;
            shift = i;
        }
    }

    return shift;
}

function decipher(cipher, shift) {
    let dec_str = "";
    for (let i = 0; i < cipher.length; i++) {
        let symbol = cipher[i].toLowerCase();
        if (symbol.charCodeAt(0) < 'a'.charCodeAt(0) || symbol.charCodeAt(0) > 'z'.charCodeAt(0)) {
            dec_str += symbol;
            continue;
        }
        let shift_add = 0;
        if (symbol.charCodeAt(0) > cipher[i].charCodeAt(0))
            shift_add = 'A'.charCodeAt(0) - 'a'.charCodeAt(0);
        let codeOfCurrentSymbol = 'a'.charCodeAt(0)
            + shift_add
            + (symbol.charCodeAt(0) - 'a'.charCodeAt(0) + (26 - shift)) % 26;
        dec_str += String.fromCharCode(codeOfCurrentSymbol);
    }

    fs.writeFileSync('output.txt', dec_str);
}

function main() {
    let cip_str = fs.readFileSync('input.txt').toString();
    let alph_freq = getAlphFreq();
    let cip_freq = getCipherFreq(cip_str);
    let shift = detShift(alph_freq, cip_freq);
    decipher(cip_str, shift);
}

main();