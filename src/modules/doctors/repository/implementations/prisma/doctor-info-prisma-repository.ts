import { Prisma } from "@prisma/client";
import { DoctorInfo } from "../../../entities/doctor-info-entity";
import { IDoctorInfoRepository } from "../../doctor-info-repository";
import { prisma } from "../../../../../infra/database/prisma-config";

export class DoctorInfoPrismaRepository implements IDoctorInfoRepository {
  
  async save(data: DoctorInfo): Promise<DoctorInfo> {
    const doctorInfo = await prisma.doctorInfo.create({data: {
      duration: data.duration,
      endAt: data.endAt,
      price: data.price,
      startAt: data.startAt,
      id: data.id,
      doctorId: data.doctorId
    }})
    return {...doctorInfo, price: Number(doctorInfo.price)}
  }

}