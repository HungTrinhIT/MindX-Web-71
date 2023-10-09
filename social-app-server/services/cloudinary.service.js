import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'hypertal',
  api_key: '128245271721292',
  api_secret: 'z7A4b2fS5Tp0sTuLMkkWAmNqpaU',
});

const uploadFile = (filePath, folder = 'social-app-71') => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      filePath,
      {
        resource_type: 'auto',
        folder,
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            url: result.secure_url,
            id: result.public_id,
          });
        }
      }
    );
  });
};

const CloudinaryService = { uploadFile };

export default CloudinaryService;
