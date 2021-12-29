import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '@/utils/token';
import UserModel from '@/resources/user/user.model';
import Token from '@/utils/interfaces/token.interface';
import HttpException from '@/utils/exceptions/http.exception';
import jwt from 'jsonwebtoken';

export default async function authenticatedMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> {
    const bearer = req.headers.authorization;

    if (!bearer || !bearer.startsWith('Bearer ')) {
        return next(new HttpException(401, 'Unauthorized'));
    }

    const accessToken = bearer.split('Bearer ')[1].trim();

    try {
        const payload: Token | jwt.JsonWebTokenError = await verifyToken(
            accessToken
        );

        /**
         * Check if Token is valid
         */
        if (payload instanceof jwt.JsonWebTokenError) {
            return next(new HttpException(401, 'Unauthorized'));
        }

        const user = await UserModel.findById(payload.id)
            .select('-password')
            .exec();
        /**
         * Check if user with ID exists, if not throw error
         */
        if (!user) {
            return next(new HttpException(401, 'Unauthorized'));
        }

        req.user = user;

        return next();
    } catch (e) {
        return next(new HttpException(401, 'Unauthorized'));
    }
}
