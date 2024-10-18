import mongoose, { Schema } from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
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
    // password: {
    //     type: String,
    //     minLength: [8, "Password must contain minimun 8 Characters"],
    //     required: true,
    //     select: false,

    // },
    // role: {
    //     type: String,
    //     required: true,
    //     enum: ["Admin", "Patient", "Doctor"],
    // },
    // doctorDepartment: {
    //     type: String,

    // },
    // docAvatar: {
    //     public_id: String,
    //     url: String,
    // },
    appointment_date: {
        type: String,
        required: true,

    },
    department: {
        type: String,
        required: true,
    },
    doctor: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        }
    },
    hasVisited: {
        type: Boolean,
        default: false,
    },
    doctorId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    patientId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending"
    }

});

export const Appointment = mongoose.model("Appointment", appointmentSchema)