const fs = require('fs');

const name = process.argv[2];
const nameLowerCase = name.toLowerCase();
const dirPath = `./src/resources/${nameLowerCase}`;

const controller = `import crudControllers from '../../utils/crud';
import ${name} from './${nameLowerCase}.model';

export default crudControllers(${name});
`;

const model = `import mongoose from 'mongoose';

const ${nameLowerCase}Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
});

export default mongoose.model('${name}', ${nameLowerCase}Schema);
`;

const router = `import express from 'express';
import controller from './${nameLowerCase}.controller';

const router = express.Router();

// /api/${nameLowerCase}s
router
  .route('/${nameLowerCase}s')
  .get(controller.getMany)
  .post(controller.createOne);

// /api/${nameLowerCase}s/:id
router
  .route('/${nameLowerCase}s/:id')
  .get(controller.getOne)
  .put(controller.updateOne)
  .delete(controller.deleteOne);

export default router;
`;

async function makeDirAndFiles() {
  await Promise.resolve(
    fs.mkdir(dirPath, err => {
      if (err) {
        throw err;
      } else {
        console.log(`Directory ${dirPath} created`);
      }
    })
  );

  // make controller.js file
  fs.writeFile(`${dirPath}/${nameLowerCase}.controller.js`, controller, err => {
    if (err) {
      throw err;
    } else {
      console.log(`File ${nameLowerCase}.controller.js created`);
    }
  });

  // make model.js file
  fs.writeFile(`${dirPath}/${nameLowerCase}.model.js`, model, err => {
    if (err) {
      throw err;
    } else {
      console.log(`File ${nameLowerCase}.model.js created`);
    }
  });

  // make router.js file
  fs.writeFile(`${dirPath}/${nameLowerCase}.router.js`, router, err => {
    if (err) {
      throw err;
    } else {
      console.log(`File ${nameLowerCase}.router.js created`);
    }
  });
}

makeDirAndFiles();
