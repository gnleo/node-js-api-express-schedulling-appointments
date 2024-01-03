import { randomUUID } from "crypto"
import { CustomError } from "../../../error/custom-error"

export type DoctorProps = {
  id?: string
  crm: string
  userId: string
  specialityId: string
}

export class Doctor {
  id?: string
  crm: string
  userId: string
  specialityId: string

  private constructor(props: DoctorProps){

    if(!props.crm){
      throw new CustomError('CRM is required.')
    }

    if(props.crm.length !== 6){
      throw new CustomError('CRM length is incorrect.')
    }

    this.id = randomUUID()
    this.crm = props.crm
    this.userId = props.userId
    this.specialityId = props.specialityId
  }

  static create(props: DoctorProps){
    const doctor = new Doctor(props)
    return doctor
  }
}