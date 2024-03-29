import { randomUUID } from "node:crypto"
import { CustomError } from "../../../error/custom-error"
import { compareEndTimeIsAfter, validateTime } from "../../../utils/date"

export type DoctorInfoProps = {
  duration: number
  price: number
  startAt: string
  endAt: string
  doctorId: string
}

export class DoctorInfo {
  
  id: string
  duration: number
  price: number
  doctorId: string

  private constructor(props: DoctorInfoProps){

    if(!props.doctorId){
      throw new CustomError('Doctor does not exists.')
    }

    if(props.duration <= 0){
      throw new CustomError('Invalid duration.')
    }

    this.id = randomUUID()
    this.doctorId = props.doctorId
    this.duration = props.duration
    this.price = props.price
  }

  static create(props: DoctorInfoProps){
    const doctorInfo = new DoctorInfo(props)
    return doctorInfo
  }

}