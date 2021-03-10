import { Router } from 'express'
import controllers from './event.controllers'

console.log(typeof(controllers.getOne))
console.log(controllers.getOne)
const router = Router()

// /api/event
router
  .route('/')
  .get(controllers.getMany)
  .post(controllers.upload,controllers.createOne)

router
  .route('/:id')
  .get(controllers.getOne)


export default router