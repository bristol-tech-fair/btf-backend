import multer from 'multer';

// This object is also used by cloudinaryService
// to generate metadata for uploaded files.
export const supportedFileFormats = {
  'image/jpeg': 'image',
  'image/png': 'image',
  'video/mp4': 'video',
  'application/pdf': 'file'
}

const fileFilter = (req, file, cb) => {
  if (supportedFileFormats.hasOwnProperty(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file format.'), false);
  }
};

// TODO: Find a way to throw a friendlier error if file size too large
export default multer({
  storage: multer.diskStorage({}),
  limits: {
    fileSize: 1024 * 1024 * 10
  },
  fileFilter
}).any();