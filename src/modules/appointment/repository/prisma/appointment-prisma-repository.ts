import { prisma } from "../../../../infra/database/prisma-config";
import { AppointmentsDate, IAppointmentRepository } from "../appointment-repository";

export class AppointmentPrismaRepository implements IAppointmentRepository {
  async findAllSchedulesByDoctorAndDate(doctorId: string, date: string): Promise<AppointmentsDate[]> {
    return await prisma.$queryRaw`
      SELECT ap.date from appointment ap where to_char(ap.date, 'YYYY-MM-DD') = '${date}'
      and ap."doctorId" = '${doctorId}'
    `
  }
}