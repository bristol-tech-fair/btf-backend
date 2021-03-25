import express from 'express';
import controller from './post.controller';

const router = express.Router();

// /api/posts
router
  .route('/')
  .get(controller.getMany)
  .post(controller.createOne);

// /api/posts/:id
router
  .route('/:id')
  .get(controller.getOne)
  .put(controller.updateOne)
  .delete(controller.deleteOne);

export default router;
