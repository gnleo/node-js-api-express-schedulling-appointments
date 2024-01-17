import { DoctorInfoPrismaRepository } from "../../repository/implementations/prisma/doctor-info-prisma-repository";
import { DoctorPrismaRepository } from "../../repository/implementations/prisma/doctor-prisma-repository";
import { CreateDoctorInfoController } from "./create-doctor-info-controller";

const doctorPrismaRepository = new DoctorPrismaRepository()
const doctorInfoRepository = new DoctorInfoPrismaRepository()
const createDoctorInfoController = new CreateDoctorInfoController(doctorPrismaRepository, doctorInfoRepository)

export { createDoctorInfoController }
