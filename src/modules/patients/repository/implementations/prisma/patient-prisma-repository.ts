import { prisma } from "../../../../../infra/database/prisma-config";
import { Patient } from "../../../entities/patient-entity";
import { IPatientRepository } from "../../patient-repository";

export class PatientPrismaRepository implements IPatientRepository {
  async findById(id: string): Promise<Patient | null> {
    const patient = await prisma.patient.findFirst({ where: { userId: id } })
    return patient
  }

  async save(data: Patient): Promise<Patient> {
   const patient = await prisma.patient.create({
    data: {
      document: data.document,
      email: data.email,
      userId: data.userId
    }
   })

   return patient
  }

  async findByDocumentOrEmail(document: string, email: string): Promise<Patient | null> {
    const patient = await prisma.patient.findFirst({
      where: {
        OR: [
          { email },
          { document }
        ]
      }
    })

    return patient
  }

}