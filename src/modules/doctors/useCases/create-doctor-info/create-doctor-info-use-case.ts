import { CustomError } from "../../../../error/custom-error"
import { IDoctorRepository } from "../../repository/doctor-repository"

export type DoctorInfoRequest = {
  startAt: string
  endAt: string
  price: number
  duration: number
}

export class CreateDoctorInfoUseCase { 

  constructor(
    private doctorRepository: IDoctorRepository
  ){}

  async execute(data: DoctorInfoRequest, userId: string){
    const doctor = await this.doctorRepository.findByUserId(userId)
    
    if(!doctor){
      throw new CustomError('Doctor does not exists.')
    }
  }
}