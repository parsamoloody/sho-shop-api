import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken';
dotenv.config()
dotenv.config({ path: '../../.env' });


export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const SECRET = process.env.AUTH_SECRET_16_TO_HEX;

    if (!SECRET || SECRET.length !== 32) {
        throw new Error('AUTH_SECRET_256 key not set or incorrect');
    }
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token' });
    }

    const token = auth.split(' ')[1];
    try {
        const payload = jwt.verify(token, SECRET, {ignoreExpiration: true});
        (req as any).user = payload;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

export function checkApiKey(req: Request, res: Response, next: NextFunction) {
    const clientKey = req.headers['x-api-key']
    const serverKey = process.env.API_SECRET_KEY
    if (!serverKey) throw new Error('API_SECRET_KEY not definde')

    if (!clientKey || clientKey !== serverKey) {
        return res.status(401).json({ message: 'Unauthorized: Invalid API key' })
    }

    next()
}
