

const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
})

exports.Cloudinary = async(image_base64,image_alt)=>{
    const upload_response = await cloudinary.uploader.upload(image_base64, {
        upload_preset: "ml_default",
        public_id: image_alt,
    })
    return upload_response;
}
