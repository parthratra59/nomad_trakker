const cloudinary = require("cloudinary").v2;

// SIZER REDUCER VALA CODE LIKH RHE HAI
//
exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
  // folder: Specifies the folder in your Cloudinary account where the uploaded file will be stored.if not specified then it will be stored in root folder

  const options = { folder };
  // folder means jha pr image store krni hai,files vgrh store krni hai

  // height: If provided, specifies the desired height of the uploaded image. This is used for image resizing.
  if (height) {
    options.height = height;
  }

  // quality: If provided, specifies the desired quality of the uploaded image. This can be used to control image compression.
  if (quality) {
    options.quality = quality;
  }

  // Yes, that's correct. When you set the resource_type parameter to "auto" in Cloudinary's uploader.upload method, you don't need to explicitly specify the resource type. Cloudinary will automatically determine the resource type based on the uploaded file's extension

  // resource_type: This is set to "auto", which allows Cloudinary to automatically determine the type of resource being uploaded (e.g., image, video, etc.) based on the file's extension. If you want to explicitly specify the resource type, you can set this to "image", "video", "raw", or "auto" (default).
  options.resource_type = "auto";

  // yh cloudinary mai upload krne ke liye hai
  return await cloudinary.uploader.upload(file.tempFilePath, options);
};
