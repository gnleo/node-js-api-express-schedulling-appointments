import { Speciality } from "../entities/speciality-entity";

export interface ISpecialityRepository {
  save(data: Speciality): Promise<Speciality>
  findByName(name: string): Promise<Speciality | null>
  findById(specialityId: string): Promise<Speciality | null>
}