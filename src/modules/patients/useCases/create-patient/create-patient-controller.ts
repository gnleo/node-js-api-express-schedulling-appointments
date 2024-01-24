import { Request, Response } from "express";
import { CreatePatientUseCase } from "./create-patient-use-case";
import { IUserRepository } from "../../../users/repository/user-repository";
import { IPatientRepository } from "../../repository/patient-repository";

export class CreatePatientController {

  constructor(
    private userRepository: IUserRepository,
    private patientRepository: IPatientRepository
  ){}

  async handle(request: Request, response: Response) {

    try {
      const createPatientUseCase = new CreatePatientUseCase(this.userRepository, this.patientRepository)
      const result = await createPatientUseCase.execute(request.body)
      
      return response.json(result)
    } catch (error: any) {
      return response.status(error.statusCode).json(error.message)
    }
  }
}