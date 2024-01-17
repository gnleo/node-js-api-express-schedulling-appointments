import { CustomError } from "../../../../error/custom-error"
import { DoctorInfo } from "../../entities/doctor-info-entity"
import { IDoctorInfoRepository } from "../../repository/doctor-info-repository"
import { IDoctorRepository } from "../../repository/doctor-repository"

export type DoctorInfoRequest = {
  startAt: string
  endAt: string
  price: number
  duration: number
}

export class CreateDoctorInfoUseCase { 

  constructor(
    private doctorRepository: IDoctorRepository,
    private doctorInfoRepository: IDoctorInfoRepository,
  ){}

  async execute(data: DoctorInfoRequest, userId: string){
    const doctor = await this.doctorRepository.findByUserId(userId)
    
    if(!doctor){
      throw new CustomError('Doctor does not exists.', 400)
    }

    const doctorInfo = DoctorInfo.create({
      ...data,
      doctorId: doctor.id!
    })

    const doctorInfoCreated = await this.doctorInfoRepository.save(doctorInfo)
    return doctorInfoCreated
  }
}