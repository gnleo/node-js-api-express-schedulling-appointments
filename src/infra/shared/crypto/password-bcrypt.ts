import { IPasswordCrypto } from "./password-crypto";
import bcrypt from 'bcryptjs'


export class PasswordBcrypt implements IPasswordCrypto {
  async hash(password: string) {
    return bcrypt.hash(password, 10)
  }

  async compare(password: string, passwordHash: string) {
    return bcrypt.compare(password, passwordHash)
  }
}