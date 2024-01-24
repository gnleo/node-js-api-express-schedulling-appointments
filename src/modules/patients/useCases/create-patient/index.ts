import { UserPrismaRepository } from "../../../users/repository/implementations/user-prisma-repository";
import { PatientPrismaRepository } from "../../repository/implementations/prisma/patient-prisma-repository";
import { CreatePatientController } from "./create-patient-controller";

const userRepository = new UserPrismaRepository()
const patientRepository = new PatientPrismaRepository()
const createPatientController = new CreatePatientController(userRepository, patientRepository)

export { createPatientController }