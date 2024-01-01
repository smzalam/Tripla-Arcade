import Users from '../../models/Users.js';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

const handleRefreshToken = async (cookies) => {

    // checking if user and password exist
    if (!cookies?.jwt) return {
        'status': 401,
        'json': { 'message': 'Unauthorized' }
    }

    const refreshToken = cookies.jwt;

    // checking for duplicating user
    const foundUser = await Users.findOne({ refreshToken: refreshToken }).exec();
    if (!foundUser) return {
        'status': 403,
        'json': { 'message': 'Forbidden' }
    }

    // evaluate jwt and generating accessToken conditionally

    const response = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) return {
                'status': 403,
                'json': {'message': 'Forbidden'}
            }
            const accessToken = jwt.sign(
                {'username': decoded.username},
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            )
            console.log(accessToken);
            return {
                'status': 200,
                'json': {
                    accessToken
                }
            }
        }
    );
    

    return response
}

export {
    handleRefreshToken
}