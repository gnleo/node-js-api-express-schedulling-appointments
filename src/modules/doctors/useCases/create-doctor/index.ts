import { SpecialityPrismaRepository } from "../../../specialities/repository/implementations/speciality-prisma-repository";
import { UserPrismaRepository } from "../../../users/repository/implementations/user-prisma-repository";
import { DoctorPrismaRepository } from "../../repository/implementations/prisma/doctor-prisma-repository";
import { CreateDoctorController } from "./create-doctor-controller";

const userRepository = new UserPrismaRepository()
const doctorRepository = new DoctorPrismaRepository()
const specialityRepository = new SpecialityPrismaRepository()

const createDoctorController = new CreateDoctorController(userRepository, doctorRepository, specialityRepository)

export { createDoctorController }