import { Request, Response } from "express";
import { ISpecialityRepository } from "../../repository/speciality-repository";
import { CreateSpecialityUseCase } from "./create-speciality-use-case";

export class CreateSpecialityController {

  constructor(private specialityRepository: ISpecialityRepository){}

  async handle(req: Request, res: Response){
    try {
      const useCase = new CreateSpecialityUseCase(this.specialityRepository)
      const result = await useCase.execute(req.body)

      return res.json(result)
    } catch(err: any){
      return res.status(err.statusCode || 400).json({err: err.message})
    }
  }
}