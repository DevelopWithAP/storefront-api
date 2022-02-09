import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const verifyAuthToken = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (typeof authorizationHeader === 'undefined') {
            const token = authorizationHeader!.split(' ')[1];
            if (process.env.TOKEN_SECRET) {
                jwt.verify(token, process.env.TOKEN_SECRET);
                next();
            }
        }
    } catch (error) {
        res.status(401).json('Access denied, invalid token');
    }
};

export default verifyAuthToken;