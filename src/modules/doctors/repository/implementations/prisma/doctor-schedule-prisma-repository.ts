import { prisma } from "../../../../../infra/database/prisma-config";
import { DoctorSchedule } from "../../../entities/doctor-schedule-entity";
import { DoctorScheduleMapper } from "../../../mapper/doctor-schedule-map";
import { IDoctorScheduleRepository } from "../../doctor-schedule-repository";

export class DoctorSchedulePrismaRepository implements IDoctorScheduleRepository{
  async save(data: DoctorSchedule): Promise<void> {
  await prisma.doctorSchedules.createMany({
      data: DoctorScheduleMapper.entityToPrisma(data)
    })
  }
}