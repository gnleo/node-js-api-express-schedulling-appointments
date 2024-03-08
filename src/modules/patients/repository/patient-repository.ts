import { Patient } from "../entities/patient-entity";

export interface PatientWithName extends Patient {
  user: {
    name: string
  }
}
export interface IPatientRepository {
  save(data: Patient): Promise<Patient>
  findByDocumentOrEmail(document: string, email: string): Promise<Patient | null>
  findById(id: string): Promise<PatientWithName | null>
}