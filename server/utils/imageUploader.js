const cloudianry = require('cloudianry').v2;


exports.uploadImageToCloudinary = async (file,folder,height,quality)=>{
    const options = {folder};
    if(height){
        options.height = height;
    }
    if(quality){
        options.quality = quality;
    }
    options.resource_type = "auto";

    return await cloudianry.uploader.upload(file.tempFilePath,options);
}