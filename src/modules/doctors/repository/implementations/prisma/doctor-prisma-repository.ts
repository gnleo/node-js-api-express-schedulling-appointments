import { prisma } from "../../../../../infra/database/prisma-config";
import { Doctor } from "../../../entities/doctor-entity";
import { DoctorWithUserName, IDoctorRepository } from "../../doctor-repository";

export class DoctorPrismaRepository implements IDoctorRepository {
  async save(data: Doctor): Promise<Doctor> {
    const doctor = await prisma.doctor.create({data})
    return doctor
  }

  async findByCRM(crm: string): Promise<Doctor | null> {
    const doctor = await prisma.doctor.findUnique({where: {crm}})
    return doctor
  }

  async findByUserId(userId: string): Promise<DoctorWithUserName | null> {
    const doctor = await prisma.doctor.findUnique({
      where: {userId},
      include: {
        user: {
          select: {
            name: true
          }
        }
      }
    })
    return doctor
  }

  async findById(id: string): Promise<Doctor | null> {
    const doctor = await prisma.doctor.findUnique({where: {id}})
    return doctor
  }
}