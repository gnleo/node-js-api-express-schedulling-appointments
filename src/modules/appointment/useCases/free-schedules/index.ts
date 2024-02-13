import { DoctorSchedulePrismaRepository } from "../../../doctors/repository/implementations/prisma/doctor-schedule-prisma-repository";
import { AppointmentPrismaRepository } from "../../repository/prisma/appointment-prisma-repository";
import { FreeSchedulesController } from "./free-schedules-controller";

const doctorScheduleRepository = new DoctorSchedulePrismaRepository()
const appointmentRepository = new AppointmentPrismaRepository()
const freeScheduleController = new FreeSchedulesController(doctorScheduleRepository, appointmentRepository)

export { freeScheduleController }