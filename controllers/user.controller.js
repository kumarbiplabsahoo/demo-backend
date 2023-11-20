const User = require('../models/user.model');

const createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();

        res.json({
            status: 201,
            message: 'User created successfully',
            data: savedUser,
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            error: error.message,
        });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json({
            status: 200,
            message:"success",
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
