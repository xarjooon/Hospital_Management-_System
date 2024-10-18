import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true, // corrected 'require' to 'required'
        minLength: [3, "First Name should contain at least 3 characters"]
    },
    lastName: {
        type: String,
        required: true, // corrected 'require' to 'required'
        minLength: [3, "Last Name should contain at least 3 characters"]
    },
    email: {
        type: String,
        required: true, // corrected 'require' to 'required'
        validate: [validator.isEmail, "Please provide a valid email!!"]
    },
    phone: {
        type: String,
        required: true, // corrected 'require' to 'required'
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v); // checks if phone number is exactly 10 digits
            },
            message: "Phone Number must contain exactly 10 digits"
        }
    },
    message: {
        type: String,
        required: true, // corrected 'require' to 'required'
        minLength: [10, "Message should contain at least 10 characters"] // message validation updated
    },
});

export const Message = mongoose.model("Message", messageSchema);
