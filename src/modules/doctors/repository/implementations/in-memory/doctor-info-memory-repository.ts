import { DoctorInfo } from "../../../entities/doctor-info-entity";
import { IDoctorInfoRepository } from "../../doctor-info-repository";

export class DoctorInfoMemoryRepository implements IDoctorInfoRepository {
  private items: DoctorInfo[] = []
  
  async saveOrUpdate(data: DoctorInfo): Promise<DoctorInfo> {
    const index = this.items.findIndex(doctor => doctor.doctorId === data.doctorId)
    if(index >= 0){
      const doctor = this.items[index]
      this.items[index] = {
        ...doctor,
        duration: data.duration,
        price: data.price,
        endAt: data.endAt,
        startAt: data.startAt
      }

      data = this.items[index]
    } else{
      this.items.push(data)
    }
    return data
  }

}