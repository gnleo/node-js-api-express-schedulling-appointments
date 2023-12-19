import { Request, Response } from "express";
import { CreateUserUseCase } from "./create-user-use-case";
import { logger } from "../../../../utils/logger";
import { IUserRepository } from "../../repository/user-repository";
import { IPasswordCrypto } from "../../../../infra/shared/crypto/password-crypto";

export class CreateUserController {

  constructor(
    private userRepository: IUserRepository,
    private passwordCrypto: IPasswordCrypto
    ){}

  async handle (request: Request, response: Response) {

    logger.info('creating user')

    try {
      const data = request.body
      const useCase = new CreateUserUseCase(this.userRepository, this.passwordCrypto)
  
      const result = await useCase.execute(data)
  
      return response.json(result)  
    } catch (error: any) {
      logger.error(error.stack)
      return response.status(error.statusCode).json({err: error.message})
    }
    
  }
}