import { Request, Response } from "express";
import { IAppointmentRepository } from "../../repository/appointment-repository";
import { IDoctorScheduleRepository } from "../../../doctors/repository/doctor-schedule-repository";
import { FreeSchedulesUseCase } from "./free-schedules-use-case";

export class FreeSchedulesController {
  constructor(
    private doctorScheduleRepository: IDoctorScheduleRepository,
    private appointmentRepository: IAppointmentRepository
  ){}

  async handle(request: Request, response: Response){
    const freeSchedulesUseCase = new FreeSchedulesUseCase(this.doctorScheduleRepository, this.appointmentRepository)

    try {
      const result = await freeSchedulesUseCase.execute(request.body)
      return response.json(result)
    } catch (err: any) {
      return response.status(err.statusCode ?? 500).json({ err: err.message })
    }
  }
}