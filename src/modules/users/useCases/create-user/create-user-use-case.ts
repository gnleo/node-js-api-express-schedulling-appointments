import { User } from "../../entities/user-entity"
import { ParameterNotFoundError } from "../../../../error/parameter-not-found.error"
import { IUserRepository } from "../../repository/user-repository"
import { CustomError } from "../../../../error/custom-error"
import { IPasswordCrypto } from "../../../../infra/shared/crypto/password-crypto"

type UserRequest =  {
  name: string
  username:string
  password: string
}

export class CreateUserUseCase {

  constructor(private userRepository: IUserRepository){}

  async execute(data: UserRequest){

    if(!data.username || !data.password){
      throw new ParameterNotFoundError('Username/password is required.', 422)
    }

    const userAlreadyExists = await this.userRepository.findByUserName(data.username)

    if(userAlreadyExists) {
      throw new CustomError('Username already exists.', 400, 'USER_EXISTS_ERROR')
    }

    const user = await User.create(data)
  
    const userCreated = await this.userRepository.save(user)

    return userCreated

  }
}