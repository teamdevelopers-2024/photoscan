import mongoose from 'mongoose';

    const userSchema = new mongoose.Schema({
        userName:String,
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String ,
            required:true
        },
        active : {
            type : Boolean,
            default:true
        },
        phoneNumber:String,
    });

const UserDb = mongoose.model('User', userSchema);

export default UserDb
