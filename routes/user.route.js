const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
} = require("../controllers/user.controller");

module.exports = app => {
    app.post("/api/createUser", createUser);
    app.post("/api/getAllUsers", getAllUsers);
    app.post("/api/getUserById", getUserById);
    app.post("/api/updateUser", updateUser);
    app.post("/api/deleteUser", deleteUser);
};