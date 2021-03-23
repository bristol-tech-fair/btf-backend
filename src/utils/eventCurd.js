import fs from 'fs';
const multer = require('multer');
const storage = multer.diskStorage({destination: function(req,file,cb){
                                    cb(null,'./uploads'); 
                                    },
                                    filename: function(req,file,cb){
                                    cb(null,file.originalname);
                                    }
                                    });

const upload = multer({storage:storage}).single("eventImg");

export const getOne = model => async (req, res) => {
  try {
    const docs = await model
      .findOne({ _id: req.params.id })
      .lean()
      .exec()
    res.status(200).json({ data: docs })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}


export const getMany = model => async (req, res) => {
    try {
      const docs = await model
        .find()
        .lean()
        .exec()
      res.status(200).json({ data: docs })
    } catch (e) {
      console.error(e)
      res.status(400).end()
    }
  }


export const createOne = model => async (req, res) => {
    const host = req.get('host');
    const eventImg = `${host}/${req.file.path}`;
    try {
      const doc = await model.create({ ...req.body, eventImg })
      res.status(201).json({ data: doc })
    } catch (e) {
      console.error(e)
      res.status(400).end()
    }
  
}


export const updateOne = model => async (req, res) => {
  try {
    if(req.file){      
      const host = req.get('host');
      req.body["eventImg"]=`${host}/${req.file.path}`;
    }
    const updatedDoc = await model
      .findByIdAndUpdate(
        {
          _id: req.params.id
        },
        req.body,
        { new: true }
      )
      .lean()
      .exec()
    if (!updatedDoc) {
      return res.status(400).end()
    }

    res.status(200).json({ data: updatedDoc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}


export const deleteOne = model => async (req, res) => {
  try {
    const deletedDoc = await model
      .findByIdAndDelete({
          _id: req.params.id
        })
      .lean()
      .exec()
    if (!deletedDoc) {
      return res.status(400).end()
    }

    if(deletedDoc.eventImg){
      const file = deletedDoc.eventImg.split('/')[1];
      console.log(file);
      fs.unlinkSync(file);
    }
    console.log(deletedDoc);
    console.log(typeof(deletedDoc));
    res.status(200).json({ data: deletedDoc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const crudControllers = model => ({
    getOne: getOne(model),
    getMany: getMany(model),
    createOne: createOne(model),
    upload,
    updateOne: updateOne(model),
    deleteOne: deleteOne(model),
})