import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

export const connectDB = async () => {

    mongoose.connection.on('connected', () => {
        console.log('Mongodb connected successfully')
    })
    await mongoose.connect(`${process.env.MONGODB_URL}`);
}

