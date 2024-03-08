import { CustomError } from "../../../../error/custom-error"
import { IMailProvider } from "../../../../infra/providers/mail/mail-provider"
import { dateToString, formatDate, formatDateUTC, getDayOfWeek, toDate } from "../../../../utils/date"
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
    private mailProvider: IMailProvider
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

    const doctorSchedule = await this.doctorScheduleRepository.findByDayOfWeekAndDoctorId(alreadyDoctorExists.id!, dayOfWeek)

    if(!doctorSchedule){
      throw new CustomError('Doctor does not attend that day.', 400)
    }

    const dateFormat = formatDateUTC(data.date, 'YYYY-MM-DD HH:mm')

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
      doctorId: alreadyDoctorExists.id!,
      patientId: alreadyPatientExists.id
    })

    await this.appointmentRepository.save(appointment)
    
    await this.mailProvider.sendMail({
      to: alreadyPatientExists.email,
      from: 'Agendamento de consulta <noreply@agendamento.com.br>',
      subject: 'Agendamento de consulta',
      html: `Olá ${alreadyPatientExists.user.name}! </br> Gostaria de confirmar sua consulta agendada para o dia ${formatDate(data.date, 'DD/MM/YYYY')} às ${formatDate(data.date, 'HH:mm')}, com o Dr ${alreadyDoctorExists.user.name}`
    })
  }
}