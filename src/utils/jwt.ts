import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from "../constants"

const getToken = (data: any) => {
    return jwt.sign(data, JWT_SECRET_KEY);

};

const verifyToken = (token: string) => {

    try {
        return jwt.verify(token, JWT_SECRET_KEY);
    } catch (error) {
        return { error: 'ivalid token' }
    }


};

export { getToken, verifyToken };