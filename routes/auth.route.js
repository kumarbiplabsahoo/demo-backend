const {
    login,
} = require("../controllers/auth.controller");

module.exports = app => {
    app.post("/api/login", login);
};