import { CustomError } from "../../../../error/custom-error"
import { ISpecialityRepository } from "../../../specialities/repository/speciality-repository"
import { User } from "../../../users/entities/user-entity"
import { IUserRepository } from "../../../users/repository/user-repository"
import { Doctor } from "../../entities/doctor-entity"
import { IDoctorRepository } from "../../repository/doctor-repository"

export type CreateDoctorRequest = {
  username: string
  name: string
  password: string
  email: string
  crm: string
  specilityId: string
}

export class CreateDoctorUseCase {

  constructor(
    private userRepository: IUserRepository, 
    private doctorRepository: IDoctorRepository,
    private specialityRepository: ISpecialityRepository
    ){}

  async execute(data: CreateDoctorRequest){
    const user = await User.create({
      name: data.name,
      password: data.password,
      username: data.username
    })

    const speciality = await this.specialityRepository.findById(data.specilityId)

    if(!speciality){
      throw new CustomError('Speciality does not exists.', 400)
    }

    const userAlreadyExists = await this.userRepository.findByUserName(data.username)

    if(userAlreadyExists) {
      throw new CustomError('Username already exists.', 400, 'USER_EXISTS_ERROR')
    }

    const userCreated = await this.userRepository.save(user)

    const doctor = Doctor.create({
      crm: data.crm,
      email: data.email,
      specialityId: data.specilityId,
      userId: userCreated.id,
    })

    const crmAlreadyExists = await this.doctorRepository.findByCRM(doctor.crm)

    if(crmAlreadyExists){
      throw new CustomError('CRM already exists.', 400)
    }

    const doctorCreated = await this.doctorRepository.save(doctor)

    return doctorCreated

  }
}