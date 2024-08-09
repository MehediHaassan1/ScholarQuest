import { Model } from "mongoose";

export interface TRegister {
    username: string;
    role: 'admin' | 'moderator' | 'user';
    email: string;
    password: string;
    isDeleted: boolean;
    status: 'active' | 'blocked';
}

export interface TLogin {
    email: string;
    password: string;
}

export interface RegisterModel extends Model<TRegister> {
    //instance methods for checking if passwords are matched
    isPasswordMatched(
        loginPassword: string,
        registerPassword: string,
    ): Promise<boolean>;
}
