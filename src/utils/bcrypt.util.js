const bcrypt = require('bcrypt');

exports.encrypt = async (password) => {
    try {
        const saltRounds = 10;
        const encrypted = await bcrypt.hash(password, saltRounds);
        if (encrypted) return encrypted;
    } catch (error) {
        console.error("Unable to encrypt password");
    }
    return false;
}

exports.compare = async (password, storePassword) => {
    try {
        const isCorrect = await bcrypt.compare(password, storePassword);
        return isCorrect;
    } catch (error) {
        console.error("Unable to verify password");
    }
    return false;
}