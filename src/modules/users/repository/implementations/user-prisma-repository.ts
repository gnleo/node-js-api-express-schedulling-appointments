import { prisma } from "../../../../infra/database/prisma-config";
import { User } from "../../entities/user-entity";
import { IUserRepository } from "../user-repository";

export class UserPrismaRepository implements IUserRepository{
  async findByUserName(userName: string): Promise<User| undefined |null> {
    const user = await prisma.user.findUnique({
      where: {
        username: userName
    }})

    return user
  }

  async save(data: User): Promise<User> {
    const user = await prisma.user.create({data: {
      name: data.name,
      username: data.username,
      password: data.password
    }})

    return user
  }

  async findById(id: string) {
    return await prisma.user.findUnique({where: {id}})
  }
}