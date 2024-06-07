import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

const authorizeUser = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({ message: 'Nothing to do over here..' });

    const token = authorization.split(' ')[1];


    const validateToken = verifyToken(token) as any;

    if (validateToken.error)
        return res.status(401).json({ message: 'Nothing to do over here..' });

    const { email, userId } = validateToken;

    res.locals.userData = { email, userId };


    next();
}

export { authorizeUser };