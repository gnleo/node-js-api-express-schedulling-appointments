import { Request, Response } from "express";
import { IDoctorRepository } from "../../repository/doctor-repository";
import { IDoctorScheduleRepository } from "../../repository/doctor-schedule-repository";
import { CreateDoctorScheduleUseCase } from "./create-doctor-schedule-use-case";

export class CreateDoctorScheduleController {

  constructor(
    private doctorRepository: IDoctorRepository,
    private doctorScheduleRepository: IDoctorScheduleRepository
  ){}

  async handle(request: Request, response: Response){
    const createDoctorScheduleUseCase = new CreateDoctorScheduleUseCase(this.doctorRepository, this.doctorScheduleRepository)
    
    try {
      await createDoctorScheduleUseCase.execute(request.body, request.userId)
      return response.status(204).end()
    } catch (err: any) {
      return response.status(err.statusCode ?? 500).json({err: err.message})
    }
  }
}