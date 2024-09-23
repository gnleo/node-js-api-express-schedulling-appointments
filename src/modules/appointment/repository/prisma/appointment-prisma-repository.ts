import { prisma } from "../../../../infra/database/prisma-config";
import { endOfDay, startOfDay } from "../../../../utils/date";
import { Appointment } from "../../entities/appointment-entity";
import { AppointmentsDate, IAppointmentRepository } from "../appointment-repository";

export class AppointmentPrismaRepository implements IAppointmentRepository {
  async findAllSchedulesByDoctorAndDate(doctorId: string, date: string): Promise<AppointmentsDate[]> {
    return await prisma.$queryRaw`
      SELECT ap.date from appointment ap where to_char(ap.date, 'YYYY-MM-DD') = '${date}'
      and ap."doctorId" = '${doctorId}'
    `
  }

  async findAppointmentByDoctorAndDateTime(doctorId: string, date: string): Promise<AppointmentsDate | null> {
    const result: AppointmentsDate[] = await prisma.$queryRaw`
      SELECT ap.date from appointment ap where to_char(ap.date, 'YYYY-MM-DD HH21:MI') = '${date}'
      and ap."doctorId" = '${doctorId} limit 1'
    `
    return result[0]
  }

  async findAppointmentByPatientAndDateTime(patientId: string, date: string): Promise<AppointmentsDate | null> {
    const result: AppointmentsDate[] = await prisma.$queryRaw`
    SELECT ap.date from appointment ap where to_char(ap.date, 'YYYY-MM-DD HH21:MI') = '${date}'
    and ap."patientId" = '${patientId} limit 1'
  `
  return result[0]
  }

  async findAllAppointmentTodayIncludesPatientData(): Promise<any> {
    const appointments = await prisma.appointment.findMany({
      where: {
        date: {
          gte: startOfDay(),
          lte: endOfDay()
        },
        isFinish: false
      },
      select: {
        id: true,
        date: true,
        note: true,
        patient: {
          select: {
            email: true,
            user: {
              select: {
                name: true
              }
            }
          }
        },
        doctor: {
          select: {
            user: {
              select: {
                name: true
              }
            }
          }
        }
      }
    })

    return appointments
  }

  async save(data: Appointment) {
    await prisma.appointment.create({
      data: {
        id: data.id,
        doctorId: data.doctorId,
        patientId: data.patientId,
        date: data.date,
        note: data.note
      }
    })
  }

}