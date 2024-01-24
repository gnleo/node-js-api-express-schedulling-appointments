import { Router } from "express";
import { createPatientController } from "../modules/patients/useCases/create-patient";

const patientRouter = Router()

patientRouter.post('/patients', async (req, res) => {
  await createPatientController.handle(req, res)
})

export { patientRouter }