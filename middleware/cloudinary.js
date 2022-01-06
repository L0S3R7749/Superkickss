const cloudinary = require('cloudinary');
const uuid4 = require('uuid4');


require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = (imagePath) =>{
    return cloudinary.v2.uploader.upload(imagePath, {public_id: uuid4()});
}

module.exports = {
    uploadImage,
}
/*failed version 1 */
// const cloudinaryUpload = async (req, res, next) => {
//     try {
//         let pictureFile = req.files;
//         if (!pictureFile) {
//             return res.status(400).json({
//                 message: 'No picture attach'
//             });
//         }
//         let multiplePicturePromise = pictureFiles.map(async (picture) => {
//             return await cloudinary.uploader.upload(picture.path);
//         })
//         let imageResponses = await Promise.all(multiplePicturePromise);
//         res.locals.images = imageResponses;
//         next();
//     } catch (err) {
//         next(err);
//     }
// }

// const cloudinaryDelete = async (req, res, next) => {
//     try {
//         let uploadImages = res.locals.images;
//         if (!uploadImages) return res.status(500).json({
//             message: 'No picture attach'
//         });
//         let multipleDestroyPromise = uploadedImages.map(image => {
//             cloudinary.uploader.destroy(image.public_id);
//         })
//         let destroyResponses = await Promise.all(multipleDestroyPromise);
//         res.locals.images = undefined
//         next();
//     } catch (err) {
//         next(err);
//     }
// }

