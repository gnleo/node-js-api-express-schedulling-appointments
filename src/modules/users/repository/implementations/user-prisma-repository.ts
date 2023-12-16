import { User } from "../../entities/user-entity";
import { IUserRepository } from "../user-repository";

export class UserPrismaRepository implements IUserRepository{
  findByUserName(userName: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  save(data: User): Promise<User> {
    throw new Error("Method not implemented.");
  }

}