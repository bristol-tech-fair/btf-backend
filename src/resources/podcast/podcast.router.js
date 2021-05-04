import express from 'express';
import controller from './podcast.controller';

const router = express.Router();

// /api/podcast
router
  .route('/podcasts')
  .get(controller.getMany)
  .post(controller.createOne);

// /api/podcast/:id
router
  .route('/podcasts/:id')
  .get(controller.getOne)
  .put(controller.updateOne)
  .delete(controller.deleteOne);

export default router;