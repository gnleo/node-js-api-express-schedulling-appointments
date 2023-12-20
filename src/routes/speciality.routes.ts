import {Router} from 'express'
import { createSpecialialityController } from '../modules/specialities/useCases/create-speciality'


const specialityRouter = Router()

specialityRouter.post('/users', async (req, res) => await createSpecialialityController.handle(req, res))

export {specialityRouter}