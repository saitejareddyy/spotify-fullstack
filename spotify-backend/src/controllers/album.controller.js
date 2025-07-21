import { v2 as cloudinary } from 'cloudinary'
import { albumModel } from '../models/album.model.js'

export const addAlbum = async (req, res) => {
    try {
        const { name, desc, bgColour } = req.body;
        const imageFile = req.file;

        if (!imageFile) {
            return res.status(400).json({ success: false, message: 'No image file uploaded' });
        }

        // Assuming cloudinary is correctly configured and imported
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });

        const albumData = {
            name,
            desc,
            bgColour,
            image: imageUpload.secure_url
        };

        const album = albumModel(albumData);
        await album.save();

        res.json({ success: true, message: 'Album added' });
    } catch (error) {
        console.error('Error in album add controller:', error);
        res.status(500).json({ success: false, message: 'Failed to add album', error: error.message });
    }
};


export const listAlbum = async (req, res) => {

    try {
        const allAlbums = await albumModel.find({});
        res.json({success:true, albums: allAlbums})
    } catch (error) {
        console.log('error in the listAlbum contoller');
        res.json({success:false});
    }
}

export const removeAlbum = async (req, res) => {
    try {
        
        await albumModel.findByIdAndDelete(req.body.id);
        res.json({success:true, message: 'Album removed'});
    } catch (error) {
        console.log('error in the remove album controller');
        res.json({success:false});
    }
}