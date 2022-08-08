const jwt = require('jsonwebtoken');
const apiConfig = require('../../config/config.json').development;

exports.createJwt = async (data) => {
    try {
        const token = await jwt.sign({
            data
        }, apiConfig.secretKey, { expiresIn: '12h' });

        if (token) {
            return { token: token };
        }
    } catch (error) {
        console.error('Unable to sign new JWToken');
    }
    return false;
}

exports.decodeJwt = async (token) => {
    try {
        const decodedData = await jwt.verify(token, apiConfig.privateKey);
        return decodedData;
    } catch (error) {
        console.error("Unable to verify JWToken.");
    }
    return false;
}