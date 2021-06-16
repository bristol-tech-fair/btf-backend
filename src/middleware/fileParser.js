import multer from 'multer';
import path from 'path';

// Temp folder storage with original filename
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

// prettier-ignore
const mimeTypes = [
  'image/jpeg',
  'image/png',
  'application/pdf',
  'text/plain'
];

const extTypes = ['jpg', 'jpeg', 'png', 'pdf', 'txt'];

const fileFilter = (req, file, cb) => {
  const fileExtension = path.extname(file.originalname).substring(1); // trimming period '.'

  if (mimeTypes.includes(file.mimetype) && extTypes.includes(fileExtension)) {
    cb(null, true);
  } else {
    // This could simply skip the file instead of throwing an error. Options available.
    cb(new Error(`Invalid filetype: ${file.originalname}`), false);
  }
};

const options = {
  storage,
  fileFilter
};

export default [
  multer(options).array('attachments'),
  // This extra middleware parses any form field labelled 'json' into req.body if present
  (req, res, next) => {
    if (req.body.json) {
      try {
        const jsonFormData = JSON.parse(req.body.json);
        req.body = { ...req.body, ...jsonFormData };
      } catch (err) {
        console.error(`Error parsing 'json' form field`);
        next(err);
      }
    }
    next();
  }
];
