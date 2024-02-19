import { Request, Response } from "express";
import { IPatientRepository } from "../../../patients/repository/patient-repository";
import { IDoctorRepository } from "../../../doctors/repository/doctor-repository";
import { IDoctorScheduleRepository } from "../../../doctors/repository/doctor-schedule-repository";
import { IAppointmentRepository } from "../../repository/appointment-repository";
import { CreateAppointmentUseCase } from "./create-appointment-use-case";

export class CreateAppointmentController {

  constructor (
    private patientRepository: IPatientRepository,
    private doctorRepository: IDoctorRepository,
    private doctorScheduleRepository: IDoctorScheduleRepository,
    private appointmentRepository: IAppointmentRepository,
  ){}


  async handle (request: Request, response: Response) {
    const createAppointmentUseCase = new CreateAppointmentUseCase(
      this.patientRepository,
      this.doctorRepository,
      this.doctorScheduleRepository,
      this.appointmentRepository
      )

    try {
      await createAppointmentUseCase.execute(request.body, request.userId)
      return response.status(201).end()
    } catch (err: any) {
      return response.status(err.statusCode ?? 500).json({err: err.message})
    }

  }
}