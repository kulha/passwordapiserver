var allChars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
function newPassword() { // shuffle 10 chars and remove two chars to finally return 8 char password
    return removeRandomLetter(shuffle(allChars).join(''));
}
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}
function verify(allPasswords, hint, answer) {
    // check length of answer
    if(answer.length<8){ // if answer is shorter than 8 chars, return undefined
        return;
    }
    // console.log(" hint,answer: " + hint + "," + answer);
    var highlight = highlights(allPasswords, hint, answer);
    if (highlight === void 0) // if highlight returns undefined, no data found, hence return undefined
        return;
    var correct = highlight.length === hint.length;
    if (correct) { // if correct, return without highlight array
        return {
            correct,
            hint,
            answer
        };
    }
    else {
        return { // if incorrect, return highlight array, too
            correct,
            highlight,
            hint,
            answer
        };
    }
}
function highlights(allPasswords, hint, answer) {
    // console.log("Highlights called. " + allPasswords.length);
    // console.log("attempt:  " + answer);

    // find the password object that has matching hint
    var passwordData = allPasswords.find((val, idx) => { return val.hint === hint });
    // console.log("found: "+data);
    // return undefined is no data found
    if (passwordData === void 0)
        return;
    // console.log("password: " + data.password);
    // console.log("hint: " + data.hint);

    // split the password string to array of chars
    var passArray = passwordData.password.split('');

    // split the answer string to array of chars
    var ansArray = answer.split('');
    // return array of chars matching by position between answer and password 
    return passArray.filter((c, i) => c === answer[i]);
}
function removeRandomLetter(str) { 
    // select 8 of 10 characters by randomly removing 2 characters.
    var pos = Math.floor(Math.random() * str.length);
    var str1 = str.substring(0, pos) + str.substring(pos + 1);
    var pos1 = Math.floor(Math.random() * str1.length);
    return str1.substring(0, pos1) + str1.substring(pos1 + 1);

}
export { newPassword, shuffle, verify };