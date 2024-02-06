import { DoctorInfo } from "../../../entities/doctor-info-entity";
import { IDoctorInfoRepository } from "../../doctor-info-repository";
import { prisma } from "../../../../../infra/database/prisma-config";

export class DoctorInfoPrismaRepository implements IDoctorInfoRepository {
  
  async saveOrUpdate(data: DoctorInfo): Promise<DoctorInfo> {
    const doctorInfo = await prisma.doctorInfo.upsert({
      where: {doctorId: data.doctorId},
      create: {
        duration: data.duration,
        price: data.price,
        id: data.id,
        doctorId: data.doctorId
      },
      update: {
        duration: data.duration,
        price: data.price,
      }
    })
    return {...doctorInfo, price: Number(doctorInfo.price)}
  }

}