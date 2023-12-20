import { SpecialityPrismaRepository } from "../../repository/implementations/speciality-prisma-repository";
import { CreateSpecialityController } from "./create-speciality-controller";

const specialityPrismaRepository = new SpecialityPrismaRepository()
const createSpecialialityController = new CreateSpecialityController(specialityPrismaRepository)

export { createSpecialialityController }