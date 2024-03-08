import { Request, Response } from "express";
import { IPatientRepository } from "../../../patients/repository/patient-repository";
import { IDoctorRepository } from "../../../doctors/repository/doctor-repository";
import { IDoctorScheduleRepository } from "../../../doctors/repository/doctor-schedule-repository";
import { IAppointmentRepository } from "../../repository/appointment-repository";
import { CreateAppointmentUseCase } from "./create-appointment-use-case";
import { IMailProvider } from "../../../../infra/providers/mail/mail-provider";

export class CreateAppointmentController {

  constructor (
    private patientRepository: IPatientRepository,
    private doctorRepository: IDoctorRepository,
    private doctorScheduleRepository: IDoctorScheduleRepository,
    private appointmentRepository: IAppointmentRepository,
    private mailProvider: IMailProvider
  ){}


  async handle (request: Request, response: Response) {
    const createAppointmentUseCase = new CreateAppointmentUseCase(
      this.patientRepository,
      this.doctorRepository,
      this.doctorScheduleRepository,
      this.appointmentRepository,
      this.mailProvider
      )

    try {
      await createAppointmentUseCase.execute(request.body, request.userId)
      return response.status(201).end()
    } catch (err: any) {
      console.log("🚀 ~ CreateAppointmentController ~ handle ~ err:", err)
      return response.status(err.statusCode ?? 500).json({err: err.message})
    }

  }
}