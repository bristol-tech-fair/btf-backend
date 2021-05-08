import express from 'express';
import controller from './event.controller';

const router = express.Router();

// /api/events
router
  .route('/events')
  .get(controller.getMany)
  .post(controller.createOne);

// /api/events/:id
router
  .route('/events/:id')
  .get(controller.getOne)
  .put(controller.updateOne)
  .delete(controller.deleteOne);

export default router;
