const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        authType:{
            type: String,
            enum:["Admin","User","Emp"],
            default:"User"
        },
        firstName: {
            type: String
        },
        lastName: {
            type: String 
        },
        image: {
            type: String
        },
        email: {
            type: String,
        },
        phone: {
            type: Number,
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
