import { PasswordBcrypt } from "../../../../infra/shared/crypto/password-bcrypt";
import { UserPrismaRepository } from "../../repository/implementations/user-prisma-repository";
import { CreateUserController } from "./create-user-controller";

const userPrismaRepository = new UserPrismaRepository()
const passwordCrypto = new PasswordBcrypt()
const createUserController = new CreateUserController(userPrismaRepository, passwordCrypto)

export { createUserController }
