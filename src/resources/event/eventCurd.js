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
      .find()
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
    const eventImg = `${host}/${req.file.path}`
    try {
      const doc = await model.create({ ...req.body, eventImg })
      res.status(201).json({ data: doc })
    } catch (e) {
      console.error(e)
      res.status(400).end()
    }
  
}





export const crudControllers = model => ({
    getOne: getOne(model),
    getMany: getMany(model),
    createOne: createOne(model),
    upload
})