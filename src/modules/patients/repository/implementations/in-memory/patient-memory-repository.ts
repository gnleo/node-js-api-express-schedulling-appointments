import { Patient } from "../../../entities/patient-entity";
import { IPatientRepository } from "../../patient-repository";

export class PatientMemoryRepository implements IPatientRepository {
  private items: Patient[] = []

  async save(data: Patient): Promise<Patient> {
    this.items.push(data)
    return data
  }
 
  async findByDocumentOrEmail(document: string, email: string): Promise<Patient | null> {
    throw new Error("Method not implemented.");
  }

  async findById(id: string): Promise<Patient | null> {
    return this.items.find(patient => patient.userId === id) || null
  }
}