import {Router} from 'express'
import { freeScheduleController } from '../modules/appointment/useCases/free-schedules'
import { createAppointmentController } from '../modules/appointment/useCases/create-appointment'
import { ensureAuthenticate } from '../infra/shared/http/middleware/ensure-authenticate-middleware'

const appointmentRouter = Router()

appointmentRouter.get('/appointment/free', async (req, res) => await freeScheduleController.handle(req, res))
appointmentRouter.post('/appointments', ensureAuthenticate, async (req, res) => await createAppointmentController.handle(req, res))

export {appointmentRouter}