import jwt from 'jsonwebtoken'
import TokenDb from '../model/tokenMode.js';
import 'dotenv/config'

const verifyRefreshTokenFn = async (refreshToken) => {
    try {
        const privateKey = process.env.REFRESH_TOKEN_PRIVAT_KEY;

        // Use async/await for the promise-based approach
        const doc = await TokenDb.findOne({ token: refreshToken }).exec();

        if (!doc) {
            throw new Error('Invalid refresh token');
        }

        // Verify the JWT token
        const tokenDetails = jwt.verify(refreshToken, privateKey);
        // Generate new access token
        const newAccessToken = jwt.sign(
            { userId: tokenDetails.userId,name :tokenDetails.name},
            process.env.ACCESS_TOKEN_PRIVAT_KEY,
            { expiresIn: '5m' } 
        );
        console.log('newACcessToken',newAccessToken)
        
        return {
            tokenDetails,
            accessToken: newAccessToken,
            error: false,
            message: 'Tokens refreshed successfully'
        };
    } catch (err) {
        return {
            error: true,
            message: err.message || 'Invalid refresh token'
        };
    }
};

export default verifyRefreshTokenFn;
