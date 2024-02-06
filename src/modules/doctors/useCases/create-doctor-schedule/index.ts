import { DoctorPrismaRepository } from "../../repository/implementations/prisma/doctor-prisma-repository";
import { DoctorSchedulePrismaRepository } from "../../repository/implementations/prisma/doctor-schedule-prisma-repository";
import { CreateDoctorScheduleController } from "./create-doctor-schedule-controller";
import { CreateDoctorScheduleUseCase } from "./create-doctor-schedule-use-case";

const doctorPrismaRepository = new DoctorPrismaRepository()
const doctorSchedulePrismaRepository = new DoctorSchedulePrismaRepository()

const createDoctorScheduleController = new CreateDoctorScheduleController(doctorPrismaRepository, doctorSchedulePrismaRepository)

export { createDoctorScheduleController }