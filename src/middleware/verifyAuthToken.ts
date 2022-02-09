import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const verifyAuthToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (typeof authorizationHeader === 'undefined') {
            const token = authorizationHeader!.split(' ')[1];
            if (process.env.TOKEN_SECRET) {
                jwt.verify(token, process.env.TOKEN_SECRET);
            }
        }
    } catch (error) {
        res.status(401).json('Access denied, invalid token');
    }
    next();
};

export default verifyAuthToken;