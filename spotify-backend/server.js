import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import songRouter from './src/routes/song.route.js';
import albumRoute from './src/routes/album.route.js';

import { connectDB } from './src/config/mongodb.js';
import { connectCloudinary } from './src/config/cloudinary.js';


const app = express();
const port = process.env.PORT || 4000;
connectCloudinary();

app.use(express.json());
app.use(cors())


app.use('/api/song', songRouter);
app.use('/api/album', albumRoute);


app.listen(port, () => {
    console.log(`server running on port ${port}`);
    connectDB();
})