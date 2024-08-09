import { model, Schema } from "mongoose";
import config from "../../config";
import bcrypt from 'bcrypt';
import { RegisterModel, TRegister } from "./auth.interface";

// Define the schema
const registerSchema = new Schema<TRegister, RegisterModel>({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    role: {
        type: String,
        enum: ['admin', 'moderator', 'user'], // Define allowed roles
        required: true,
        default: 'user',
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: ['active', 'blocked'], // Define allowed statuses
        required: true,
        default: 'active',
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// hashed the password field
registerSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(
        this.password,
        Number(config.saltRounds)
    )
    next();
})

// remove the password field in the response
registerSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        delete ret.password;
        return ret;
    }
});

registerSchema.statics.isPasswordMatched = async function (
    loginPassword,
    registerPassword,
) {
    return await bcrypt.compare(loginPassword, registerPassword);
};

const UserRegistration = model<TRegister, RegisterModel>('UserRegistration', registerSchema);

export default UserRegistration;