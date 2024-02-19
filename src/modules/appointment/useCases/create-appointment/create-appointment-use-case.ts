import { CustomError } from "../../../../error/custom-error"
import { dateToString, formatDate, getDayOfWeek, toDate } from "../../../../utils/date"
import { IDoctorRepository } from "../../../doctors/repository/doctor-repository"
import { IDoctorScheduleRepository } from "../../../doctors/repository/doctor-schedule-repository"
import { IPatientRepository } from "../../../patients/repository/patient-repository"
import { Appointment } from "../../entities/appointment-entity"
import { IAppointmentRepository } from "../../repository/appointment-repository"

export type CreateAppointmentRequest = {
  doctorId: string
  date: Date
}

export class CreateAppointmentUseCase {

  constructor (
    private patientRepository: IPatientRepository,
    private doctorRepository: IDoctorRepository,
    private doctorScheduleRepository: IDoctorScheduleRepository,
    private appointmentRepository: IAppointmentRepository,
  ){}
  
  async execute (data: CreateAppointmentRequest, userId: string) {
    const alreadyPatientExists = await this.patientRepository.findById(userId)

    if(!alreadyPatientExists){
      throw new CustomError('Patient does not exists.')
    }

    const alreadyDoctorExists = await this.doctorRepository.findByUserId(data.doctorId)

    if(!alreadyDoctorExists){
      throw new CustomError('Doctor does not exists.')
    }

    const dayOfWeek = getDayOfWeek(dateToString(data.date))

    const doctorSchedule = await this.doctorScheduleRepository.findByDayOfWeekAndDoctorId(data.doctorId, dayOfWeek)

    if(!doctorSchedule){
      throw new CustomError('Doctor does not attend that day.', 400)
    }

    const dateFormat = formatDate(data.date, 'YYYY-MM-DD HH:mm')

    const existsAppointmentDoctor = await this.appointmentRepository.findAppointmentByDoctorAndDateTime(alreadyDoctorExists.id!, dateFormat)

    if(existsAppointmentDoctor){
      throw new CustomError('There is already an appointment for this time.')
    }

    const existsAppointmentPatient = await this.appointmentRepository.findAppointmentByPatientAndDateTime(alreadyPatientExists.userId, dateFormat)

    if(existsAppointmentPatient){
      throw new CustomError('There is already an appointment for this patient.')
    }

    const appointment = Appointment.create({
      date: toDate(data.date),
      doctorId: data.doctorId,
      patientId: alreadyPatientExists.userId
    })

    await this.appointmentRepository.save(appointment)
  }
}