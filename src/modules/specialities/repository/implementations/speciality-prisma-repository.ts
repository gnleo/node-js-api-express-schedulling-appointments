import { prisma } from "../../../../infra/database/prisma-config";
import { Speciality } from "../../entities/speciality-entity";
import { ISpecialityRepository } from "../speciality-repository";

export class SpecialityPrismaRepository implements ISpecialityRepository {
  async save(data: Speciality) {
    const speciality = await prisma.speciality.create({
      data: {
        name: data.name,
        description: data.description,
        id: data.id
      }
    })
    
    return speciality
  }

  async findByName(name: string) {
    return await prisma.speciality.findUnique({ where: {name}})
  }

  async findById(specialityId: string): Promise<Speciality | null> {
    return await prisma.speciality.findUnique({where: {id: specialityId}}) 
  }

}