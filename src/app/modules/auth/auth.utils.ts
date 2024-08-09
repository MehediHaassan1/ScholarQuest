import jwt, { JwtPayload } from 'jsonwebtoken';

export const createToken = (
    jwtPayload: { user: string; role: string },
    secret: string,
    expiresIn: string,
) => {
    console.log(expiresIn)
    return jwt.sign(jwtPayload, secret, {
        expiresIn,
    });
};

export const verifyToken = (token: string, secret: string) => {
    return jwt.verify(token, secret) as JwtPayload;
};