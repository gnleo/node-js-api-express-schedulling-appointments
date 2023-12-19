import { User } from "../entities/user-entity"

export interface IUserRepository {
  findByUserName(userName: string): Promise<User | undefined | null>
  save(data: User): Promise<User>
}