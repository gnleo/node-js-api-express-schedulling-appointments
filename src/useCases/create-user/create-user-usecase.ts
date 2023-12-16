import { User } from "../../entities/user-entity"
import { ParameterNotFoundError } from "../../error/parameter-not-found.error"
import { UserRepository } from "../../repository/user-repository"

type UserRequest =  {
  name: string
  username:string
  password: string
}

export class CreateUserUseCase {
  async execute(data: UserRequest){

    const userRepository = UserRepository.getInstance()

    if(!data.username || !data.password){
      throw new ParameterNotFoundError('Username/password is required.', 422)
    }

    const userAlreadyExists = await userRepository.findByUsername(data.username)

    if(userAlreadyExists) {
      throw new Error('Username already exists.')
    }

    const user = User.create(data)

    const userCreated = await userRepository.save(user)

    return userCreated

  }
}