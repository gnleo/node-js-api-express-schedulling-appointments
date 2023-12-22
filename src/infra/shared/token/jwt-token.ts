import { sign, verify } from "jsonwebtoken";
import { createHmac } from "crypto"

import { IToken } from "./token";
import { User } from "../../../modules/users/entities/user-entity";
import { logger } from "../../../utils/logger";

export class JWTToken implements IToken {

  private TOKEN_SECRET = process.env.SECRET_KEY_TOKEN || ''
  private TOKEN_SECRET_CRYPTO = createHmac('sha256', this.TOKEN_SECRET).digest('base64')
  
  async create({username, isAdmin, id}: User) {
    return sign({ user: {username, isAdmin, id} }, this.TOKEN_SECRET_CRYPTO, {
      subject: id,
      expiresIn: '1m'
    })
  }

  async validate(token: string) {
    try {
      verify(token, this.TOKEN_SECRET_CRYPTO)
      return true
    } catch (error: any) {
      logger.error(error.stack)
      return false
    }
  }

}