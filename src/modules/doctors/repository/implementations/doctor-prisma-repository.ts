import { prisma } from "../../../../infra/database/prisma-config";
import { Doctor } from "../../entities/doctor-entity";
import { IDoctorRepository } from "../doctor-repository";

export class DoctorPrismaRepository implements IDoctorRepository {
  async save(data: Doctor): Promise<Doctor> {
    const doctor = await prisma.doctor.create({data})
    return doctor
  }

  async findByCRM(crm: string): Promise<Doctor | null> {
    const doctor = await prisma.doctor.findUnique({where: {crm}})
    return doctor
  }

}