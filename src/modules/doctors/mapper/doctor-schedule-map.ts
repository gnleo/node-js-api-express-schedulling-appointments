import { randomUUID } from "crypto";
import { DoctorSchedule } from "../entities/doctor-schedule-entity";
import { DoctorSchedules as DoctorSchedulesPrisma } from "@prisma/client"

export class DoctorScheduleMapper {
  static entityToPrisma = (data: DoctorSchedule): DoctorSchedulesPrisma[] => {
    const doctorSchedulePrisma: DoctorSchedulesPrisma[] = []
    
    data.schedules.forEach((scheduler) => {
      doctorSchedulePrisma.push({
        doctorId: data.doctorId,
        dayOfWeek: scheduler.dayOfWeek,
        endAt: scheduler.endAt,
        startAt: scheduler.startAt,
        id: scheduler.id ?? randomUUID()
      })
    })

    return doctorSchedulePrisma
  }
}