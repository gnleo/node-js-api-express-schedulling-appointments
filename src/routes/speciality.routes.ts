import {Router} from 'express'
import { createSpecialialityController } from '../modules/specialities/useCases/create-speciality'


const specialityRouter = Router()

specialityRouter.post('/specialities', async (req, res) => await createSpecialialityController.handle(req, res))

export {specialityRouter}