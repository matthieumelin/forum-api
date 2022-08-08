const User = require('../models/user.model');
const { createJwt } = require('../utils/jwt.util');
const { encrypt, compare } = require('../utils/bcrypt.util');
const apiConfig = require('../../config/config.json').development;

exports.register = async (req, res) => {
    try {
        const { displayName, email, password } = req.body;
 
        if (!displayName || !email || !password) {
            return res.status(400).json({
                message: "Tous les champs ne sont pas remplis correctement."
            })
        }
        if (password.length < 8) {
            return res.status(400).json({
                message: "Veuillez renseigner un mot de passe contenant au moins 8 caractères."
            });
        }

        const isExist = await User.findOne({ where: { email: email } });

        if (isExist) {
            return res.status(400).json({
                message: "L'utilisateur existe déjà."
            });
        }

        const encryptedPassword = await encrypt(password);
        const data = {
            displayName: displayName,
            email: email,
            password: encryptedPassword
        }

        if (data.email && data.password) {
            await new User(data).save();

            return res.status(201).json({
                message: "L'utilisateur a été créé."
            });
        }

        return res.status(400).json({
            message: "Une erreur est survenue."
        });
    } catch (error) {
        console.error("An error occurred while creating a user: ", error);
        return res.status(400).json({
            message: error
        });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Tous les champs ne sont pas remplis correctement."
            })
        }

        const user = await User.findOne({ where: { email: email } });

        if (!user) {
            return res.status(404).json({
                message: "L'email et/ou le mot de passe est incorrect."
            });
        }

        const isCorrectPassword = await compare(password, user.password);

        if (!isCorrectPassword) {
            return res.status(400).json({
                message: "L'email et/ou le mot de passe est incorrect."
            });
        }

        const token = await createJwt({
            userId: user.id,
            displayName: user.displayName,
            email: user.email,
        });

        return res.status(200).json({
            message: "Vous êtes désormais connecté.",
            data: {
                accessToken: token.token,
            }
        });
    } catch (error) {
        console.error("An error occurred while logged a user: ", error);
        return res.status(400).json({
            message: error
        });
    }
}