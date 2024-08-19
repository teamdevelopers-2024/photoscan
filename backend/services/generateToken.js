import jwt from 'jsonwebtoken';
import TokenDb from '../model/tokenMode.js';

const generateToken = async (user) => {
    try {
        const payload = { _id: user._id, userName: user.userName };

        // Corrected typo from process.evn to process.env
        const accessToken = jwt.sign(
            payload,
            process.env.ACCESS_TOKEN_PRIVAT_KEY,
            { expiresIn: '14m' }
        );

        const refreshToken = jwt.sign(
            payload,
            process.env.REFRESH_TOKEN_PRIVAT_KEY,
            { expiresIn: '30d' }
        ); 

        // Ensure userId is correctly referenced
        const userToken = await TokenDb.findOne({ userId: user._id });
        if (userToken) await TokenDb.deleteOne({userId:user._id})

        await new TokenDb({ userId: user._id, token: refreshToken }).save();
        return { accessToken, refreshToken };
    } catch (error) {
        console.log(error)
        throw error; // Use throw to reject the promise
    }
};

export default generateToken
