import { Request, Response } from "express";
import { CreateUserUseCase } from "./create-user-use-case";
import { logger } from "../../../../utils/logger";
import { IUserRepository } from "../../repository/user-repository";

export class CreateUserController {

  constructor(private userRepository: IUserRepository){}

  async handle (request: Request, response: Response) {

    logger.info('creating user')

    try {
      const data = request.body
      const useCase = new CreateUserUseCase(this.userRepository)
  
      const result = await useCase.execute(data)
  
      return response.json(result)  
    } catch (error: any) {
      logger.error(error.stack)
      return response.status(error.statusCode).json(error.message)
    }
    
  }
}