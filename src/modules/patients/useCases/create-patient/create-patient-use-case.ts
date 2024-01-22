import { CustomError } from "../../../../error/custom-error"
import { User } from "../../../users/entities/user-entity"
import { IUserRepository } from "../../../users/repository/user-repository"
import { Patient } from "../../entities/patient-entity"
import { IPatientRepository } from "../../repository/patient-repository"

export type CreatePatientRequest = {
  username: string
  password: string
  email: string
  name: string
  document: string
}

export class CreatePatientUseCase {

  constructor(
    private userRepository: IUserRepository,
    private patientRepository: IPatientRepository){}

  async execute(data: CreatePatientRequest){
    const user = await User.create({
      name: data.name,
      password: data.password,
      username: data.username
    })

    const userAlreadyExists = await this.userRepository.findByUserName(data.username)

    if(userAlreadyExists) {
      throw new CustomError('Username already exists.', 400, 'USER_EXISTS_ERROR')
    }

    const userCreated = await this.userRepository.save(user)

    const patient = await Patient.create({email: data.email, document: data.document, userId: userCreated.id})
    const patientCreated = await this.patientRepository.save(patient)
    
    return patientCreated
  }
}