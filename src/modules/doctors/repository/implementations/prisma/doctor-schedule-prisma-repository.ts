import { prisma } from "../../../../../infra/database/prisma-config";
import { DoctorSchedule } from "../../../entities/doctor-schedule-entity";
import { DoctorScheduleMapper } from "../../../mapper/doctor-schedule-map";
import { DoctorScheduleWeek, IDoctorScheduleRepository } from "../../doctor-schedule-repository";

export class DoctorSchedulePrismaRepository implements IDoctorScheduleRepository{
  async findByDayOfWeekAndDoctorId(id: string, dayOfWeek: number): Promise<DoctorScheduleWeek | null> {
    const result = await prisma.doctorSchedules.findFirst({
      where: {
        dayOfWeek,
        AND: {
          doctorId: id
        }
      },
      include: {
        doctor: {
          select: { 
            DoctorInfo: {
              select: {
                duration: true
              }
            }
          }
        }
      }
    })

    return result
  }

  async save(data: DoctorSchedule): Promise<void> {
    await prisma.$transaction([
      prisma.doctorSchedules.deleteMany({
        where: {
          doctorId: data.doctorId
        }
      }),

      prisma.doctorSchedules.createMany({
        data: DoctorScheduleMapper.entityToPrisma(data)
      })
    ])
  }
}