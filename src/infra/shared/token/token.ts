import { User } from "../../../modules/users/entities/user-entity";

export type TokenUser = {
  sub: string
}

export interface IToken {
  create(user: User): Promise<string>
  validate(token: string): TokenUser | null
}