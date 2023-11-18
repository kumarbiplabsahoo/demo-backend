const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        userName: {
            type: String
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
        },
        password: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
);

const User = model("User", userSchema);
module.exports = User;
