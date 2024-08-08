import { model, Schema } from "mongoose";
import config from "../../config";
import bcrypt from 'bcrypt';

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

// hashed the password field
registrationSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(
        this.password,
        Number(config.saltRounds)
    )
    next();
})

// remove the password field in the response
registrationSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        delete ret.password;
        return ret;
    }
});

const UserRegistration = model('UserRegistration', registrationSchema);

export default UserRegistration;