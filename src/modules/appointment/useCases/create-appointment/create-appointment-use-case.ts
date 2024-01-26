import { CustomError } from "../../../../error/custom-error"
import { IDoctorRepository } from "../../../doctors/repository/doctor-repository"
import { IPatientRepository } from "../../../patients/repository/patient-repository"

export type CreateAppointmentRequest = {
  doctorId: string
  date: Date
}

export class CreateAppointmentUseCase {

  constructor (
    private patientRepository: IPatientRepository,
    private doctorRepository: IDoctorRepository
  ){}
  
  async execute (data: CreateAppointmentRequest, userId: string) {
    const alreadyPatientExists = await this.patientRepository.findById(userId)

    if(!alreadyPatientExists){
      throw new CustomError('Patient does not exists.')
    }

    const alreadyDoctorExists = await this.doctorRepository.findByUserId(data.doctorId)

    if(!alreadyDoctorExists){
      throw new CustomError('Doctor does not exists.')
    }
  }
}