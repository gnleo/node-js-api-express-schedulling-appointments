import { DoctorSchedule } from "../entities/doctor-schedule-entity";

export type DoctorScheduleWeek = {
  id: string
  startAt: string
  endAt: string
  dayOfWeek: number
  doctorId: string,
  doctor: {
    DoctorInfo: {
      duration: number
    }[]
  }
}


export interface IDoctorScheduleRepository {
  save(data: DoctorSchedule): Promise<void>
  findByDayOfWeekAndDoctorId(id: string, dayOfWeek: number): Promise<DoctorScheduleWeek | null>
}