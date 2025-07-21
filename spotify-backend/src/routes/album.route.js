import express, { Router } from 'express'
import { addAlbum, listAlbum, removeAlbum } from '../controllers/album.controller.js'
import { upload } from '../middleware/multer.js';
upload

const albumRoute = express.Router();

albumRoute.post('/add', upload.single('image'), addAlbum);
albumRoute.get('/list', listAlbum);
albumRoute.post('/remove', removeAlbum);

export default albumRoute;