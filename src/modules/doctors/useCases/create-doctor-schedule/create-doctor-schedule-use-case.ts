import { CustomError } from "../../../../error/custom-error"
import { DoctorSchedule } from "../../entities/doctor-schedule-entity"
import { IDoctorRepository } from "../../repository/doctor-repository"
import { IDoctorScheduleRepository } from "../../repository/doctor-schedule-repository"

export type CreateDoctorScheduleRequest = {
  doctorId: string
  schedules: DoctorSchedulesRequest[]
}

type DoctorSchedulesRequest = {
  startAt: string
  endAt: string
  dayOfWeek: number
 }

export class CreateDoctorScheduleUseCase {

  constructor(
    private doctorRepository: IDoctorRepository,
    private doctorScheduleRepository: IDoctorScheduleRepository
  ){}

  async execute(data: CreateDoctorScheduleRequest, userId: string) {

    const doctor = await this.doctorRepository.findById(userId)

    if(!doctor) {
      throw new CustomError('Doctor does not exists.', 400)
    }

    const doctorSchedule = DoctorSchedule.create({
      schedules: data.schedules,
      doctorId: doctor.id!
    })

    await this.doctorScheduleRepository.save(doctorSchedule)
  }
}