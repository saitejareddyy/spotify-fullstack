import {v2 as cloudinary} from 'cloudinary'
import dotenv from 'dotenv'
dotenv.config();


export const connectCloudinary = async () => {
    await cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARU_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET_KEY,
    })
}