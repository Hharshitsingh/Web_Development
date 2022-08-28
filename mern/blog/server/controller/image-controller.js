import grid from 'gridfs-stream';
import mongoose from 'mongoose';

let gfs, gridfsBucket;
const url = "http://localhost:8000";
const conn = mongoose.connection;
conn.once("open", () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "photos"
    });
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('photos');
}).on("error", (err) => {
    
    
}
);

export const uploadImage = (req, res) => {
    if(!req.file) {
        return res.status(400).json({
            message: "No image provided",
            isSuccess: false,
        });
    }

    const Imageurl = `${url}/file/${req.file.filename}`;
    return res.status(200).json({
        message: "Image uploaded successfully",
        isSuccess: true,
        imageurl: Imageurl
    });
}

export const getImage = async(req, res) => {
    try{
       const file = await gfs.files.findOne({ filename: req.params.filename });
       const readStream = gridfsBucket.openDownloadStream(file._id);
         readStream.pipe(res);
    }catch(err){
        res.status(404).json({
            message: err
        });
    }
}

