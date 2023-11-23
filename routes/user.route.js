const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
} = require("../controllers/user.controller");

const {
    authenticateToken
} = require("../middlewares/middleware");

module.exports = app => {
    app.post("/api/createUser", createUser);
    app.post("/api/getAllUsers", authenticateToken, getAllUsers);
    app.post("/api/getUserById", authenticateToken, getUserById);
    app.post("/api/updateUser", authenticateToken, updateUser);
    app.post("/api/deleteUser", authenticateToken, deleteUser);
};