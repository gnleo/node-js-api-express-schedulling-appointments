import { Request, Response } from "express";
import { IPasswordCrypto } from "../../../../infra/shared/crypto/password-crypto";
import { IUserRepository } from "../../repository/user-repository";
import { AuthenticateUserUseCase } from "./authenticate-user-use-case";
import { IToken } from "../../../../infra/shared/token/token";

export class AuthenticateUserController {
  constructor(
    private userRepository: IUserRepository,
    private passwordCrypto: IPasswordCrypto,
    private token: IToken
  ) {}

  async handle(req: Request, res: Response){
    try {
      const data = req.body

      const authenticateUserUseCase = new AuthenticateUserUseCase(this.userRepository, this.passwordCrypto, this.token)
      const result = await authenticateUserUseCase.execute(data)

      return res.json(result)
    } catch (err: any) {
      return res.status(err.statusCode).json({
        err: err.message
      })
    }
  }
}