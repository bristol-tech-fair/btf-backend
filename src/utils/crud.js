import fs from 'fs';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: './uploads',
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage }).single("image");

// Get Many
const getMany = model => async (req, res) => {
  try {
    const docs = await model.find();
    res.json({ data: docs });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Get One
const getOne = model => async (req, res) => {
  try {
    const doc = await model.findById(req.params.id);
    if (!doc) {
      return res.status(404).send('Resource not found');
    } else {
      res.json({ data: doc });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Create One
const createOne = model => async (req, res) => {
  try {
    if (req.file) {
      const host = req.get('host');
      var image = `${host}/${req.file.path}`;
    }
    const doc = await model.create({ ...req.body, image });
    res.status(201).json({ data: doc });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// UPDATE ONE
const updateOne = model => async (req, res) => {
  try {
    if (req.file) {
      const host = req.get('host');
      req.body["image"] = `${host}/${req.file.path}`;
    }
    const doc = await model.updateOne({ _id: req.params.id }, req.body);
    res.json({ msg: `Resource ID: ${req.params.id} updated`, data: doc });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Delete One
const deleteOne = model => async (req, res) => {
  try {
    const doc = await model.deleteOne({ _id: req.params.id });
    if (req.file) {
      const file = deletedDoc.image.split('/')[1];
      fs.unlinkSync(file);
    }
    res.json({ msg: `Resource ID: ${req.params.id} deleted`, data: doc });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const crudControllers = model => {
  return {
    getMany: getMany(model),
    getOne: getOne(model),
    createOne: createOne(model),
    updateOne: updateOne(model),
    deleteOne: deleteOne(model),
    upload,
  };
};

export default crudControllers;
