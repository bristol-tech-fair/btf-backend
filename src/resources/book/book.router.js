import express from 'express';
import controller from './book.controller';

const router = express.Router();

// /api/books
router
  .route('/books')
  .get(controller.getMany)
  .post(controller.createOne);

// /api/books/:id
router
  .route('/books/:id')
  .get(controller.getOne)
  .put(controller.updateOne)
  .delete(controller.deleteOne);

export default router;
