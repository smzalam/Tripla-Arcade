import Users from '../../models/Users.js';
import bcrypt from 'bcrypt';

const handleNewUser = async (user, pwd) => {

    // checking if user and password exist
    if (!user || !pwd) return {
        'status': 400,
        'json': { 'message': 'Username and password are required.' }
    }

    // checking for duplicating user
    const duplicate = await Users.findOne({ username: user }).exec();
    console.log('DUPLIATE: ', duplicate)
    if (duplicate) return {
        'status': 409,
        'json': { 'message': 'Username already exists' }
    }

    // adding user to database
    try {
        //encrypting password
        const hashedPwd = await bcrypt.hash(pwd, 10);

        // creating and storing new user
        const result = await Users.create({
            'username': user,
            'password': hashedPwd
        })

        console.log(result)

        return {
            'status': 201,
            'json': { 'success': `New user ${user} created!` }
        }

    } catch (error) {
        return {
            'status': 500,
            'json': { 'message': error.nessage }
        }
    }
}

export {
    handleNewUser
}