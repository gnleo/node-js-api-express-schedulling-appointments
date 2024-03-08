import { Doctor } from "../entities/doctor-entity";

export interface DoctorWithUserName extends Doctor {
  user: {
    name: string
  }
}
export interface IDoctorRepository {
  save(data: Doctor): Promise<Doctor>
  findByCRM(crm: string): Promise<Doctor | null>
  findByUserId(userId: string): Promise< DoctorWithUserName| null>
  findById(id: string): Promise< Doctor | null>
}