const User = require('../models/user.model');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {

    try {
        const { authType, firstName, lastName, image, email, phone, password } = req.body;

        if (!authType || !['Admin', 'User', 'Emp'].includes(authType)) {
            return res.status(400).json({
                status: 400,
                error: 'Invalid authType. Must be one of: Admin, User, Emp.',
            });
        }

        if (!firstName || !lastName || !email || !phone || !password) {
            return res.status(400).json({
                status: 400,
                error: 'All fields (firstName, lastName, email, phone, password) are required.',
            });
        }

        // Check if the email is already taken
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                status: 400,
                error: 'Email is already registered.',
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with the hashed password
        const newUser = new User({
            authType,
            firstName,
            lastName,
            image,
            email,
            phone,
            password: hashedPassword,
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        // Return the response
        res.status(201).json({
            status: 201,
            message: 'User created successfully',
            data: savedUser,
        });
    } catch (error) {
        // Handle unexpected errors
        console.error('Error creating user:', error);
        res.status(500).json({
            status: 500,
            error: 'Internal Server Error',
        });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json({
            status: 200,
            message: "success",
            data: users,
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            error: error.message,
        });
    }
};

const getUserById = async (req, res) => {
    try {
        const userId = req.body.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                status: 404,
                message: 'User not found',
            });
        }

        res.json({
            status: 200,
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            error: error.message,
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = req.body.id;
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
            new: true,
        });

        if (!updatedUser) {
            return res.status(404).json({
                status: 404,
                message: 'User not found',
            });
        }

        res.json({
            status: 200,
            message: 'User updated successfully',
            data: updatedUser,
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            error: error.message,
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.body.id;
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({
                status: 404,
                message: 'User not found',
            });
        }

        res.json({
            status: 200,
            message: 'User deleted successfully',
            data: deletedUser,
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            error: error.message,
        });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};
