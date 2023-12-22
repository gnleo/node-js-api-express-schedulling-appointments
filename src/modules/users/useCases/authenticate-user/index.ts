import { PasswordBcrypt } from "../../../../infra/shared/crypto/password-bcrypt"
import { JWTToken } from "../../../../infra/shared/token/jwt-token"
import { UserPrismaRepository } from "../../repository/implementations/user-prisma-repository"
import { AuthenticateUserController } from "./authenticate-user-controller"

const userRepository = new UserPrismaRepository()
const passwordCrypto = new PasswordBcrypt()
const token = new JWTToken()
const authenticateUserController = new AuthenticateUserController(userRepository, passwordCrypto, token)

export { authenticateUserController }