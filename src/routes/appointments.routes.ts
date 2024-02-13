import {Router} from 'express'
import { freeScheduleController } from '../modules/appointment/useCases/free-schedules'

const appointmentRouter = Router()

appointmentRouter.get('/appointment/free', async (req, res) => await freeScheduleController.handle(req, res))

export {appointmentRouter}