import dotenv from 'dotenv';

const errorsFound = dotenv.config();
if (errorsFound.error) {
  throw new Error('.env file not found');
  process.exit(1);
}

export default {
  port: process.env.PORT,
  databaseURI: process.env.DB_CONNECTION,
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    secret: process.env.CLOUDINARY_API_SECRET
  }
};
