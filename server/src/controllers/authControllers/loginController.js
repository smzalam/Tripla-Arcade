import Users from '../../models/Users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { promises } from 'fs';
import path from 'path';

const handleLogin = async (user, pwd) => {

    // checking if user and password exist
    if (!user || !pwd) return {
        'status': 400,
        'json': { 'message': 'Username and password are required.' }
    }

    // checking for duplicating user
    const foundUser = await Users.findOne({ username: user }).exec();
    if (!foundUser) return {
        'status': 401,
        'json': { 'message': 'Unauthorized' }
    }

    // evaluate password
    const match = await bcrypt.compare(pwd, foundUser.password);

    // authorize user and create session
    if (match) {
        // create JWTs
        const accessToken = jwt.sign(
            { 'username': foundUser.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
        )
        const refreshToken = jwt.sign(
            { 'username': foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        )
        foundUser.refreshToken = refreshToken;
        await foundUser.save();

        return {
            'status': 200,
            'cookie': {
                jwt: 'jwt',
                refreshToken,
                options: {
                    httpOnly: true,
                    maxage: 24 * 69 * 60 * 1000,
                }
            },
            'json': { accessToken }
        }
    } else {
        return {
            'status': 201,
            'json': { 'message': 'Unauthorized' }
        }
    }
}

export {
    handleLogin
}