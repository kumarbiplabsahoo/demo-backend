const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require("dotenv").config();

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate request body
        if (!email || !password) {
            return res.status(400).json({
                status: 400,
                error: 'Email and password are required fields.',
            });
        }

        // Find the user by email
        const user = await User.findOne({ email });

        // Check if the user exists
        if (!user) {
            return res.status(401).json({
                status: 401,
                error: 'Invalid credentials. User not found.',
            });
        }

        // Validate the password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                status: 401,
                error: 'Invalid credentials. Password is incorrect.',
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '8h' } // You can adjust the expiration time
        );

        res.json({
            status: 200,
            message: 'Login successful',
            token,
            user
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            error: error.message,
        });
    }
};

module.exports = {
    login
};
