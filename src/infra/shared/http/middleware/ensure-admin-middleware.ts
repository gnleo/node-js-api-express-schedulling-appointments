import { NextFunction, Request, Response } from "express";
import { JWTToken } from "../../token/jwt-token";
import { UserPrismaRepository } from "../../../../modules/users/repository/implementations/user-prisma-repository";


export const ensureAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const userRepository = new UserPrismaRepository()
  const user = await userRepository.findById(req.userId)

  if(!user){
    return res.status(400).json({message: 'Uses does not exists.'})
  }

  if(!user.isAdmin){
    return res.status(401).json({message: 'User is not admin.'})
  }
  
  return next()
}