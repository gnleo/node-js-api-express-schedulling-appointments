import { Speciality } from "../../entities/speciality-entity";
import { ISpecialityRepository } from "../speciality-repository";

export class SpecialityMemoryRepository implements ISpecialityRepository {
  private items:Speciality [] = []

  async save(data: Speciality): Promise<Speciality> {
    this.items.push(data)
    return data
  }

  async findByName(name: string): Promise<Speciality | null> {
    return this.items.find(speciality => speciality.name === name) || null
  }
  
  async findById(specialityId: string): Promise<Speciality | null> {
    return this.items.find(speciality => speciality.id === specialityId) || null
  }
}