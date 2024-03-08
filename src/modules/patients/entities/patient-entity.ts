import { randomUUID } from "crypto"
import { CustomError } from "../../../error/custom-error"

export type PatientProps = {
  email: string,
  document: string,
  userId: string,
}

export class Patient {
  id: string
  email: string
  document: string
  userId: string

  private constructor(props: PatientProps){

    if(!props.email){
      throw new CustomError('Email is required.')
    }

    if(!props.document || props.document.length <= 5){
      throw new CustomError('Document invalid.')
    }

    this.id = randomUUID()
    this.email = props.email
    this.document = props.document
    this.userId = props.userId
  }

  static async create(props: PatientProps){
    const patient = new Patient(props)
    return patient
  }
}