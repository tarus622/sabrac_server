const User = require('../database/models/user.model');
const bcrypt = require('bcrypt');

const usersService = {}

usersService.getUserByEmail = async function (data) {
    try {
        const { email, password } = data;
        const user = await User.findOne({ email: email });

        if (!user) {
            throw new Error('User not found');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new Error('Password is incorrect');
        }

        return user;
    } catch (error) {
        console.error('Error in getUserByEmail:', error.message);
        throw new Error(error.message);
    }
};



usersService.createUser = async function (data) {
    try {
        const { name, email, password } = data;

        // Check if the email is already taken
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            throw new Error('Email is already taken');
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password: hashPassword });

        const savedUser = await newUser.save();

        return savedUser;
    } catch (error) {
        console.error('Error in createUser:', error.message);
        throw new Error(error.message);
    }
};

module.exports = usersService;