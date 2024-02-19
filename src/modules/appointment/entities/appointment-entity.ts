import { randomUUID } from "crypto"

type AppointmentProps = {
  patientId: string
  doctorId: string
  date: Date
}

export class Appointment {
  patientId: string
  doctorId: string
  id?: string
  date: Date
  note?: string
  isFinish: boolean

  private constructor(props: AppointmentProps) {
    this.id = randomUUID()
    this.doctorId = props.doctorId
    this.patientId = props.patientId
    this.date = props.date
    this.note = 'default string into entity'
    this.isFinish = false
  }

  static create(data: AppointmentProps){
    const appointment = new Appointment(data)
    return appointment
  }
}