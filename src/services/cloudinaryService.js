import cloudinary from 'cloudinary';

class CloudinaryService {
  constructor() {
    if (!CloudinaryService.instance) {
      cloudinary.v2.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
      });
      this.rootFolder = 'bristol-tech-fair';
      CloudinaryService.instance = this;
    }

    return CloudinaryService.instance;
  }

  async upload(files, resourceId) {
    const uploadOptions = {
      folder: `${this.rootFolder}/${resourceId}`,
      use_filename: true,
      resource_type: 'auto'
    };

    try {
      const metadata = await Promise.all(
        files.map(async file => {
          const {
            secure_url,
            public_id,
            resource_type
          } = await cloudinary.v2.uploader.upload(file.path, uploadOptions);

          console.log(`Uploaded ${file.filename}`);

          return { secure_url, _id: public_id, resource_type };
        })
      );

      return metadata;
    } catch (err) {
      throw new Error(`Cloudinary upload error: ${err.message}`);
    }
  }

  async findByResourceId(resourceId) {
    try {
      const res = await cloudinary.v2.search
        .expression(`folder:${this.rootFolder}/${resourceId}/*`)
        .execute();

      if (res.resources.length > 0) {
        const metadata = res.resources.map(datum => {
          return {
            _id: datum.public_id,
            secure_url: datum.secure_url,
            resource_type: datum.resource_type
          };
        });
        return metadata;
      }

      return [];
    } catch (err) {
      throw new Error(
        `Cloudinary could not find files for resource ${resourceId}: ${err.message}`
      );
    }
  }

  async findByIds(resourceId, ids) {
    try {
      let metadata = await this.findByResourceId(resourceId);
      metadata = metadata.filter(datum => ids.includes(datum._id));
      return metadata;
    } catch (err) {
      throw new Error(
        `Cloudinary could not find files for resource ${resourceId}: ${err.message}`
      );
    }
  }

  async updateFiles(previousMetadata, idsToDelete, resourceId, filesToUpload) {
    let metadataForUpdate = previousMetadata || [];

    // Deleting files
    if (idsToDelete !== undefined && idsToDelete.length > 0) {
      const metadataOfFilesForDeletion = await this.findByIds(
        resourceId,
        idsToDelete
      );
      await this.deleteByMetadata(metadataOfFilesForDeletion);
      // Discard metadata for deleted files
      metadataForUpdate = metadataForUpdate.filter(
        datum => !idsToDelete.includes(datum._id)
      );
    }

    // Uploading files
    if (filesToUpload !== undefined && filesToUpload.length > 0) {
      const newMetadata = await this.upload(filesToUpload, resourceId);
      metadataForUpdate.push(...newMetadata);
    }

    return metadataForUpdate;
  }

  async deleteByMetadata(metadata) {
    try {
      await Promise.all(
        metadata.map(datum =>
          cloudinary.v2.uploader.destroy(datum._id, {
            resource_type: datum.resource_type
          })
        )
      );
    } catch (err) {
      throw new Error(`Cloudinary could not delete files: ${err.message}`);
    }
  }

  async deleteEmptyResourceFolder(resourceId) {
    try {
      await cloudinary.v2.api.delete_folder(`${this.rootFolder}/${resourceId}`);
      console.log(`Cloudinary deleted resource folder ${resourceId}`);
    } catch (err) {
      throw new Error(
        `Cloudinary could not delete resource folder ${resourceId}: ${err.message}`
      );
    }
  }
}

const instance = new CloudinaryService();
Object.freeze(instance);

export default instance;
