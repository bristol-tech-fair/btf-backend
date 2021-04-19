import express from 'express';
import controller from './group.controller';

const router = express.Router();

// /api/groups
router
  .route('/groups')
  .get(controller.getMany)
  .post(controller.createOne);

// /api/groups/:id
router
  .route('/groups/:id')
  .get(controller.getOne)
  .put(controller.updateOne)
  .delete(controller.deleteOne);

export default router;
