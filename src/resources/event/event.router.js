import { Router } from 'express'
import controllers from './event.controllers'

const router = Router()

// /api/event
router
  .route('/')
  .get(controllers.getMany)
  .post(controllers.upload,controllers.createOne)

router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.upload,controllers.updateOne)
  .delete(controllers.deleteOne)


export default router