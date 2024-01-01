import Users from '../../models/Users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { promises } from 'fs';
import path from 'path';

const handleLogout = async (cookies) => {

    // checking if user and password exist
    if (!cookies?.jwt) return {
        'status': 204,
        'json': { 'message': 'Sucess' }
    }

    const refreshToken = cookies.jwt;

    // checking for duplicating user
    const foundUser = await Users.findOne({ refreshToken: refreshToken }).exec();
    if (!foundUser) {
        return {
            'status': 204,
            cookie: {
                jwt: 'jwt',
                options: {
                    httpOnly: true
                }
            },
            'json': { 'message': 'Success' }
        }
    }

    // authorize user and create session

    foundUser.refreshToken = ''
    const result = await foundUser.save()
    console.log(result);

    return {
        'status': 204,
        cookie: {
            jwt: 'jwt',
            options: {
                httpOnly: true
            }
        },
        'json': { 'message': 'Success' }
    }
}

export {
    handleLogout
}