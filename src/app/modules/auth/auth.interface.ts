export type TRegister = {
    username: string;
    role: 'admin' | 'moderator' | 'user';
    email: string;
    password: string;
}
