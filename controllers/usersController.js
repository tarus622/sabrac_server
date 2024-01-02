const usersService = require('../services/usersService');

const userController = {}

userController.getUserByEmail = async function (req, res) {
    try {
        const data = req.body;
        const user = await usersService.getUserByEmail(data);

        res.status(201).json(user);
    } catch (error) {
        res.send(error.message);
    }
}

userController.postUser = async function (req, res) {
    try {
        const data = req.body;

        const savedUser = await usersService.createUser(data);

        res.status(201).json(savedUser);
    } catch (error) {
        res.send(error.message);
    }
}

module.exports = userController;