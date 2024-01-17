import { Request, Response } from "express";
import { IDoctorInfoRepository } from "../../repository/doctor-info-repository";
import { IDoctorRepository } from "../../repository/doctor-repository";
import { CreateDoctorInfoUseCase } from "./create-doctor-info-use-case";

export class CreateDoctorInfoController {
  constructor(
    private doctorRepository: IDoctorRepository,
    private doctorInfoRepository: IDoctorInfoRepository
  ){}

  async handle(request: Request, response: Response){
    const { body, userId } = request

    try {
      const createDoctorInfoUseCase = new CreateDoctorInfoUseCase(this.doctorRepository, this.doctorInfoRepository)
      const result = await createDoctorInfoUseCase.execute(body, userId)
      return response.json(result)
    } catch (error: any) {
      return response.status(error.statusCode).json({
        err: error.message
      })
    }
    
  }
}