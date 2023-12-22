import { User } from "../../../modules/users/entities/user-entity";

export interface IToken {
  create(user: User): Promise<string>
  validate(token: string): Promise<boolean>
}