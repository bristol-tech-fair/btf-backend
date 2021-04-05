import express from 'express';
import controller from './learningResource.controller';

const router = express.Router();

// /api/learningResources
router
  .route('/')
  .get(controller.getMany)
  .post(controller.createOne);

// /api/learningResources/:id
router
  .route('/:id')
  .get(controller.getOne)
  .put(controller.updateOne)
  .delete(controller.deleteOne);

export default router;