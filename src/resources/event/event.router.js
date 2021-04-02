import express from 'express';
import controller from './event.controller';

const router = express.Router();

// /api/events
router
  .route('/')
  .get(controller.getMany)
  .event(controller.createOne);

// /api/events/:id
router
  .route('/:id')
  .get(controller.getOne)
  .put(controller.updateOne)
  .delete(controller.deleteOne);

export default router;
