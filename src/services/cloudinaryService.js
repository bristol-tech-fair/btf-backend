import cloudinary from 'cloudinary';
import { supportedFileFormats } from '../middleware/fileParser';

// TODO   Extend this service to upload files into folders based
// TODO   on user id, once authentication is implemented.

const folder = 'bristol-tech-fair';

const addFiles = async (files) => {
  const metadata = [];

  for (const file of files) {
    const fileType = supportedFileFormats[file.mimetype];

    const result = await cloudinary.v2.uploader.upload(file.path, {
      folder: `${folder}/${fileType}s`
    });

    metadata.push({
      _id: result.public_id,
      fileType,
      originalFileName: file.originalname,
      url: result.secure_url
    });
  }

  return metadata;
}

const updateFiles = async (newMetadata, oldMetadata, files) => {
  const updatedMetadata = [];

  if (newMetadata !== undefined) {
    const newMetadataIds = new Set(newMetadata.map(metadatum => metadatum._id));
    const toRemove = oldMetadata.filter(metadatum => !(newMetadataIds.has(metadatum._id)));
    await removeFiles(toRemove);
    updatedMetadata.push(...newMetadata);
  } else {
    // If we don't have any new metadata, we want to preserve the old
    updatedMetadata.push(...oldMetadata);
  }

  if (files !== undefined) {
    const uploadedFileMetadata = await addFiles(files);
    updatedMetadata.push(...uploadedFileMetadata);
  }

  return updatedMetadata;
}

const removeFiles = async (metadata) => {
  for (const metadatum of metadata) {
    await cloudinary.v2.uploader.destroy(metadatum._id);
  }
}

export default {
  addFiles,
  updateFiles,
  removeFiles
}