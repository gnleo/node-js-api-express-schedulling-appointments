import {Router} from 'express'
import { createSpecialialityController } from '../modules/specialities/useCases/create-speciality'
import { ensureAuthenticate } from '../infra/shared/http/middleware/ensure-authenticate-middleware'
import { ensureAdmin } from '../infra/shared/http/middleware/ensure-admin-middleware'


const specialityRouter = Router()

specialityRouter.post('/specialities', 
ensureAuthenticate, ensureAdmin,
async (req, res) => await createSpecialialityController.handle(req, res))

export {specialityRouter}