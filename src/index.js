import express from 'express';
import 'dotenv/config';
import { newPassword, shuffle, verify } from './password';
import cors from 'cors';

const expressApp = express();
expressApp.use(express.json());
expressApp.use(cors());
let allPasswords = []; //TODO convert to Map object

expressApp.get('/new-password', (req, res) => {
    var password = '';
    // console.log("allPasswords: " + allPasswords.map((v) => v.password + "=" + v.hint));
    password = newPassword();
    // console.log("password: " + password);
    var hint = '';
    do { // shuffle new password
        hint = shuffle(password.split('')).join('');
    }
    while (allPasswords.findIndex((val, idx) => { val.hint === hint }) >= 0);
    // console.log("hint: " + hint);
    //add new password and hint to array
    allPasswords.push({ password, hint }); // unlimited array size -- TODO --limit it
    // console.log('Generated new password and hint returned');
    res.send({ hint });
    console.log(hint);
});
expressApp.post('/verify-password', (req, res) => {
    console.log('Verify called: ' + JSON.stringify(req.body));
    var verification = verify(allPasswords, req.body.hint, req.body.answer);
    if (verification === void 0)
        res.status(404).send();
    else
        res.send(verification);
    // console.log('Password is verified.');
});
expressApp.listen(process.env.SERVER_PORT, () => {
    console.log('Password API Server started at port ' + process.env.SERVER_PORT);
});
module.exports = expressApp;