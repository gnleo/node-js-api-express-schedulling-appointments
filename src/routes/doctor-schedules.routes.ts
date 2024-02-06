import { Router } from "express";
import { ensureAuthenticate } from "../infra/shared/http/middleware/ensure-authenticate-middleware";
import { createDoctorScheduleController } from "../modules/doctors/useCases/create-doctor-schedule";

const doctorSchedulesRouter = Router()

doctorSchedulesRouter.post('/doctor-schedule', ensureAuthenticate, async (req, res) => {
  await createDoctorScheduleController.handle(req, res)
})

export { doctorSchedulesRouter }