import express from 'express';
import controller from './club.controller';

const router = express.Router();

// /api/clubs
router
  .route('/')
  .get(controller.getMany)
  .post(controller.createOne);

// /api/clubs/:id
router
  .route('/:id')
  .get(controller.getOne)
  .put(controller.updateOne)
  .delete(controller.deleteOne);

export default router;
