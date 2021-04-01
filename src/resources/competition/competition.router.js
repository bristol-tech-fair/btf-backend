import express from 'express';
import controller from './competition.controller';

const router = express.Router();

// /api/competitions
router
  .route('/')
  .get(controller.getMany)
  .post(controller.createOne);

// /api/competitions/:id
router
  .route('/:id')
  .get(controller.getOne)
  .put(controller.updateOne)
  .delete(controller.deleteOne);

export default router;
