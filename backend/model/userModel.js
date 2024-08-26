import mongoose from 'mongoose';

    const userSchema = new mongoose.Schema({
        name:String,
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
        isBlocked:{
            type:Boolean,
            default:false
        }
    });

const UserDb = mongoose.model('User', userSchema);

export default UserDb
