import express from 'express';
import controller from './podcast.controller';

const router = express.Router();

// /api/podcast
router
  .route('/')
  .get(controller.getMany)
  .post(controller.createOne);

// /api/podcast/:id
router
  .route('/:id')
  .get(controller.getOne)
  .put(controller.updateOne)
  .delete(controller.deleteOne);

export default router;