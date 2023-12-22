import { sign } from "jsonwebtoken";
import { createHmac } from "crypto"

import { IToken } from "./token";
import { User } from "../../../modules/users/entities/user-entity";

export class JWTToken implements IToken {

  private TOKEN_SECRET = process.env.SECRET_KEY_TOKEN || ''
  private TOKEN_SECRET_CRYPTO = createHmac('sha256', this.TOKEN_SECRET).digest('base64')
  
  async create({username, isAdmin, id}: User) {
    return sign({ user: {username, isAdmin, id} }, this.TOKEN_SECRET_CRYPTO, {
      subject: id,
      expiresIn: '1m'
    })
  }

}