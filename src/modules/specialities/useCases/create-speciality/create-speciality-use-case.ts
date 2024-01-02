import { CustomError } from "../../../../error/custom-error"
import { Speciality } from "../../entities/speciality-entity"
import { ISpecialityRepository } from "../../repository/speciality-repository"

type SpecialityRequest = {
  name: string
  description: string
} 

export class CreateSpecialityUseCase {

  constructor(private specialityRepository: ISpecialityRepository){}
  
  async execute(data: SpecialityRequest){
    const speciality = new Speciality(data)

    const alreadyExistsSpeciality = await this.specialityRepository.findByName(data.name)

    if(alreadyExistsSpeciality){
      throw new CustomError('Speciality already exists.', 401)
    }

    const specialityCreated = await this.specialityRepository.save(speciality)
    
    return specialityCreated
  }
}