import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js"
import { Message } from "../schema/messageSchema.js";
import { User } from "../schema/userSchema.js";
import { generatejsonwebToken } from "../Utils/jwtToken.js";
import cloudinary from 'cloudinary'
export const patientRegister = catchAsyncErrors(async (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        password,
        role,
    } = req.body;
    if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !nic ||
        !dob ||
        !gender ||
        !password ||
        !role
    ) {
        return next(new ErrorHandler("please fill the form Compleatly", 400))
    }
    let user = await User.findOne({ email });
    if (user) {
        return next(new ErrorHandler("user Already Registerd", 400));
    }
    user = await User.create({
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        password,
        role,
    });
    generatejsonwebToken(user, "User Registered Successfully!!", 200, res)

});

export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password, confirmPassword, role } = req.body;
    if (!email || !password || !confirmPassword || !role) {
        return next(new ErrorHandler("please provide all Details", 400));

    }
    if (password !== confirmPassword) {
        return next(new ErrorHandler("password and confirmPassword does not Match", 400))
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Inavlid password or Email", 400))
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid password or Email", 400))
    }
    if (role !== user.role) {
        return next(new ErrorHandler("user with this role is not found", 400))
    }
    generatejsonwebToken(user, "User Logged in successfully...", 200, res)

});

export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        password,
    } = req.body;
    if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !nic ||
        !dob ||
        !gender ||
        !password
    ) {
        return next(new ErrorHandler("please fill the form Compleatly", 400))
    }
    const isRegisterd = await User.findOne({ email });
    if (isRegisterd) {
        return next(new ErrorHandler(` ${isRegisterd.role} with this Email Already Exist!!`));

    }
    const admin = await User.create({ firstName, lastName, email, phone, gender, dob, password, nic, role: "Admin" });
    res.status(200).json({
        success: true,
        message: "New Admin Registerd"
    })
})

export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
    const doctors = await User.find({ role: "Doctor" });
    res.status(200).json({
        success: true,
        doctors
    })
});

export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    });
});

export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
    res.status(200)
        .cookie("adminToken", "", {
            httpOnly: true,
            expires: new Date(Date.now()),
        })
        .json({
            success: true,
            message: "Admin logged out Successfully"
        });
});

export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
    res.status(200)
        .cookie("patientToken", "", {
            httpOnly: true,
            expires: new Date(Date.now()),
        })
        .json({
            success: true,
            message: "Patient logged out Successfully"
        });
});

export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Doctor Avtar Required", 400));
    }
    const { docAvatar } = req.files;
    const allowedFormates = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormates.includes(docAvatar.mimetype)) {
        return next(new ErrorHandler("File format Not Supported", 400))
    }
    const {
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        password,
        doctorDepartment
    } = req.body
    if (
        (!firstName ||
            !lastName ||
            !email ||
            !phone ||
            !nic ||
            !dob ||
            !gender ||
            !password ||
            !doctorDepartment)
    ) {
        return next(new ErrorHandler("please fill the form compleatly", 400))
    }
    const isRegisterd = await User.findOne({ email });
    if (isRegisterd) {
        return next(new ErrorHandler(`${isRegisterd.role} is Already Registered with this email`))
    }

    const cloudinaryResponse = await cloudinary.v2.uploader.upload(docAvatar.tempFilePath);
    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error(
            "cloudinary Error:",
            cloudinaryResponse.error || "Unknown Cloudinary Error"
        );
    }
    const doctor = await User.create({
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        password,
        doctorDepartment,
        role: "Doctor",
        docAvatar: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        }
    });
    res.status(200).json({
        success: true,
        message: " New Doctor Registered ",
        doctor
    });

});