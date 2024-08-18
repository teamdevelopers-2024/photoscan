import TokenDb from '../model/userToken.js';
import jwt from 'jsonwebtoken';



const verifyRefreshToken = async (refreshToken) => {
    try {
        const privateKey = process.env.REFRESH_TOKEN_PRIVAT_KEY;

        // Use async/await for the promise-based approach
        const doc = await TokenDb.findOne({ token: refreshToken }).exec();

        if (!doc) {
            throw new Error('Invalid refresh token');
        }

        // Verify the JWT token
        const tokenDetails = jwt.verify(refreshToken, privateKey);

        return {
            tokenDetails,
            error: false,
            message: 'Valid refresh token'
        };
    } catch (err) {
        return {
            error: true,
            message: err.message || 'Invalid refresh token'
        };
    }
};

export default verifyRefreshToken;
