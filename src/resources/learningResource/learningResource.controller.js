import crudControllers from '../../utils/crud';
import LearningResource from './learningResource.model';
import cloudinaryService from '../../services/cloudinaryService';

const createOne = async (req, res) => {
  try {
    let doc = await LearningResource.create(req.body);

    // Upload files to Cloudinary if present
    if (req.files && req.files.length > 0) {
      try {
        const metadata = await cloudinaryService.upload(req.files, doc._id);
        req.body = { ...req.body, attachments: metadata };
        doc = await LearningResource.findByIdAndUpdate(doc._id, req.body, {
          new: true
        });
      } catch (err) {
        console.log(`File upload error: ${err.message}`);
        throw err;
      }
    }

    res.status(201).send({ data: doc });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
};

const updateOne = async (req, res) => {
  try {
    if (req.params.id === undefined) return;

    let doc = await LearningResource.findById(req.params.id);
    if (!doc) {
      res.status(404).json({ msg: 'Resource not found' });
      return;
    }

    const metadataForUpdate = await cloudinaryService.updateFiles(
      doc.attachments,
      req.body.attachmentsToDelete,
      req.params.id,
      req.files
    );

    req.body = { ...req.body, attachments: metadataForUpdate };

    doc = await LearningResource.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    res.send({ data: doc });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const deleteOne = async (req, res) => {
  try {
    const doc = await LearningResource.findById(req.params.id);
    if (!doc) {
      res.status(404).json({ msg: 'Resource not found' });
      return;
    }

    // Check for files on Cloudinary and delete all of them
    const metadata = await cloudinaryService.findByResourceId(doc._id);
    try {
      if (metadata.length > 0) {
        await cloudinaryService.deleteByMetadata(metadata);
        await cloudinaryService.deleteEmptyResourceFolder(doc._id);
      }
    } catch (err) {
      throw err;
    }

    await doc.delete();

    // res.json({ msg: `Resource ID: ${req.params.id} deleted`, data: doc });
    res.json({
      msg: `Resource ID: ${req.params.id} ${
        metadata.length > 0
          ? `and ${metadata.length} attachment${
              metadata.length > 1 ? `s ` : ` `
            }`
          : ``
      }deleted`,
      data: doc
    });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
};

export default {
  ...crudControllers(LearningResource),
  createOne,
  updateOne,
  deleteOne
};
