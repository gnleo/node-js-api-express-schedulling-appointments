import { Patient } from "../../../entities/patient-entity";
import { IPatientRepository } from "../../patient-repository";

export class PatientMemoryRepository implements IPatientRepository {
  private items: Patient[] = []

  async save(data: Patient): Promise<Patient> {
    this.items.push(data)
    return data
  }

}