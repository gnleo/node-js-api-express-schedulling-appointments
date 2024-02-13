import { Router } from "express"
import { userRouter } from "./user-routes"
import { specialityRouter } from "./speciality.routes"
import { doctorRouter } from "./doctor-routes"
import { doctorInfoRouter } from "./doctor-info-routes"
import { patientRouter } from "./patient-routes"
import { doctorSchedulesRouter } from "./doctor-schedules.routes"
import { appointmentRouter } from "./appointments.routes"

const router = Router()
router.use(userRouter)
router.use(specialityRouter)
router.use(doctorRouter)
router.use(doctorInfoRouter)
router.use(doctorSchedulesRouter)
router.use(patientRouter)
router.use(appointmentRouter)

export { router }