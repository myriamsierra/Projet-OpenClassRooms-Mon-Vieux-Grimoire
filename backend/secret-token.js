//////////////////////SECRET TOKEN//////////////////////////////

//GENERATION EN HEXADECIMAL AVEC MODUL CRYPTO
const crypto = require('crypto');

const generateRandomToken = () => {
    const buffer = crypto.randomBytes(64);
    return buffer.toString('hex');
};

const randomToken = generateRandomToken();

const dotenv = require('dotenv');
dotenv.config();

process.env.TOKEN_SECRET = randomToken;

