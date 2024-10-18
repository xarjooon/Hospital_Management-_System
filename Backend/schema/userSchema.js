import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const userSchema = new mongoose.Schema({
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
    nic: {
        type: String,
        required: true,
        minLength: [12, "NIC Number must contain exactly 12 digits"],
        maxLength: [12, "NIC Number must contain exactly 12 digits"]

    },
    dob: {
        type: Date,
        required: [true, "DOB is required"],
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"],
    },
    password: {
        type: String,
        minLength: [8, "Password must contain minimun 8 Characters"],
        required: true,
        select: false,

    },
    role: {
        type: String,
        required: true,
        enum: ["Admin", "Patient", "Doctor"],
    },
    doctorDepartment: {
        type: String,

    },
    docAvatar: {
        public_id: String,
        url: String,
    },

});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});
userSchema.methods.comparePassword = async function (enetredPassword) {
    return await bcrypt.compare(enetredPassword, this.password)
};

userSchema.methods.generatejsonwebToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRES
    })
}


export const User = mongoose.model("User", userSchema);
