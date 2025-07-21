import { v2 as cloudinary } from 'cloudinary';
import { songModel } from '../models/song.model.js';

export const addSong = async (req, res) => {
    try {
        const name = req.body.name;
        const desc = req.body.desc;
        const album = req.body.album;

        // Ensure these exist and are correctly accessed
        const audioFile = req.files.audio[0];
        const imageFile = req.files.image[0];

        if (!audioFile || !imageFile) {
            return res.status(400).json({ success: false, message: 'Audio or image file not provided.' });
        }

        const audioUpload = await cloudinary.uploader.upload(audioFile.path, { resource_type: 'video' });
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });

        const durationInSeconds = audioUpload.duration;
        const minutes = Math.floor(durationInSeconds / 60);
        const seconds = Math.floor(durationInSeconds % 60).toString().padStart(2, '0'); // Ensures 2 digits, e.g., "05" instead of "5"
        const duration = `${minutes}:${seconds}`;

        console.log(name, desc, album, audioUpload, imageUpload, duration);

        const songData = {
            name,
            desc,
            album,
            image: imageUpload.secure_url,
            file: audioUpload.secure_url,
            duration
        };

        const song = songModel(songData);
        await song.save();

        res.json({ success: true, message: 'Song added' });
    } catch (error) {
        console.error('Error in song.controller.js:', error);
        res.status(500).json({ success: false, message: 'Failed to add song.' });
    }
};

export const listSong = async (req, res) => {
    try {

        const allSongs = await songModel.find({});
        res.json({ success: true, songs: allSongs });

    } catch (error) {
        console.log('error in listsong controller');
        res.json({ success: false })
    }
};

export const removeSong = async (req, res) => {
    console.log(req.body.id);
    try {
        await songModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "song removed" });
    } catch (error) {
        console.log('error in the remove song controller');
        res.json({ success: false })
    }
}