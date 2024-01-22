import { prisma } from "../../../../../infra/database/prisma-config";
import { Patient } from "../../../entities/patient-entity";
import { IPatientRepository } from "../../patient-repository";

export class PatientPrismaRepository implements IPatientRepository {
  async save(data: Patient): Promise<Patient> {
   const patient = await prisma.patient.create({data: {
    document: data.document,
    email: data.email,
    userId: data.userId
   }})

   return patient
  }

}