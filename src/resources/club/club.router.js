import express from 'express';
import controller from './club.controller';

const router = express.Router();

// /api/clubs
router
  .route('/clubs')
  .get(controller.getMany)
  .post(controller.createOne);

// /api/clubs/:id
router
  .route('/clubs/:id')
  .get(controller.getOne)
  .put(controller.updateOne)
  .delete(controller.deleteOne);

export default router;
