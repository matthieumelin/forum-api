const { Op } = require('sequelize');
const User = require('../models/users.model');
const { decode } = require('../utils/jwt.util');

const auth = async (req, res, next) => {
    try {
        const email = req.body.email || req.query.email;
        const authorization = req.headers.authorization;

        if (!email || !authorization) {
            return res.status(401).json({
                message: "Accès interdit."
            });
        }

        const token = authorization.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Accès interdit."
            });
        }

        const user = await User.findOne({ where: { [Op.and]: { email: email, accessToken: token, accessTokenExpires: { [Op.gt]: Date.now() } } } });

        if (!user) {
            return res.status(401).json({
                message: "Accès interdit."
            });
        }

        const userData = await decode(user.accessToken);

        if (!userData) {
            return res.status(401).json({
                message: "Accès interdit."
            });
        }

        req.decoded = userData.data;

        next();
    } catch (error) {
        console.error("Unable to auth user: ", error);
        return res.status(500).json({
            message: error
        });
    }
}

module.exports = auth;