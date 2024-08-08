import { model, Schema } from "mongoose";

const registrationSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
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
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin', 'moderator'],
    }
}, {
    timestamps: true,
});

const UserRegistration = model('UserRegistration', registrationSchema);

export default UserRegistration;