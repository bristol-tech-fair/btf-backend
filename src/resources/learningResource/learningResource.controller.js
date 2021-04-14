import crudControllers from '../../utils/crud';
import LearningResource from './learningResource.model';
import cloudinaryService from '../../services/cloudinaryService';

const createOne = async (req, res) => {
  try {
    if(req.files !== undefined) {
      const metadata = await cloudinaryService.addFiles(req.files);
      req.body = {
        ...req.body,
        attachments: metadata
      };
    }

    const doc = await LearningResource.create(req.body);
    res.status(201).json({ data: doc });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const updateOne = async (req, res) => {
  try {
    let doc = await LearningResource.findById(req.params.id);
    if (!doc)
      return res.status(404).json({ msg: 'Resource not found.' });

    const updatedMetadata = await cloudinaryService.updateFiles(
      req.body.attachments,
      doc.attachments,
      req.files
    );

    req.body = {
      ...req.body,
      attachments: updatedMetadata
    }

    doc = await LearningResource.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true, runValidators: true });

    res.json({ msg: `Resource ID: ${req.params.id} updated`, data: doc });
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};

const deleteOne = async (req, res) => {
  try {
    const doc = await LearningResource.findById(req.params.id);
    if (!doc)
      return res.status(404).json({ msg: 'Resource not found.' });

    await cloudinaryService.removeFiles(doc.attachments);

    await doc.delete();

    res.json({ msg: `Resource ID: ${req.params.id} deleted`, data: doc });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export default {
  ...crudControllers(LearningResource),
  createOne,
  updateOne,
  deleteOne
};