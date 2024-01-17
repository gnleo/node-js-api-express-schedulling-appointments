import { Router } from "express";
import { createDoctorInfoController } from "../modules/doctors/useCases/create-doctor-info";
import { ensureAuthenticate } from "../infra/shared/http/middleware/ensure-authenticate-middleware";

const doctorInfoRouter = Router()

doctorInfoRouter.post('/doctor-info', ensureAuthenticate, async (req, res) => {
  await createDoctorInfoController.handle(req, res)
})

export { doctorInfoRouter }