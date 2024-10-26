import mongoose from "mongoose";

async function connectDb() {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.MONGO_URL);

        console.log("Database connected successfully!!");

    } catch (error) {
        console.log(`Database connection error: ${error}`);
    }
}

export default connectDb;
