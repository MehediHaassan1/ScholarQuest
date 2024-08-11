import { TUser } from "../user/user.interface";

export type TRegister = Pick<TUser, 'userName' | 'email' | 'password' | 'role' | 'status' | 'isDeleted'>

export interface TLogin {
    email: string;
    password: string;
}