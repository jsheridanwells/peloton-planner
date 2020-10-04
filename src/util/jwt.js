import jwt from 'jsonwebtoken';
import dayjs from 'dayjs';
import appConfig from '../config/appConfig';


export function createToken(user) {
    const expiresIn = dayjs(new Date()).millisecond() + appConfig.tokenExpiration;
    console.log('expires in', expiresIn);
    return {
        token: jwt.sign({
            email: user.email,
            _id: user.id,
        }, appConfig.appSecret, { expiresIn: appConfig.tokenExpiration })
    };
}

export function verifyToken(token) {
    return jwt.verify(token, appConfig.appSecret, (err, decode) => {
        if (err) return null;
        else
            return decode;
    });
}
