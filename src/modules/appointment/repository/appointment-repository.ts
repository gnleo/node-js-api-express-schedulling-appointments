import { Appointment } from "../entities/appointment-entity"

export type AppointmentsDate = {
  date: Date
} 

export type AppointmentTodayIncludesPatient = {
  id: string
  date: Date
  note: string | null
  doctor: {
    user: {
      name: string
    }
  }
  patient: {
    email: string
    user: {
      name: string
    }
  }
}


export interface IAppointmentRepository {
  findAllSchedulesByDoctorAndDate(doctorId: string, date: string): Promise<AppointmentsDate[]>
  findAppointmentByDoctorAndDateTime(doctorId: string, date: string): Promise<AppointmentsDate | null>
  findAppointmentByPatientAndDateTime(patientId: string, date: string): Promise<AppointmentsDate | null>
  findAllAppointmentTodayIncludesPatientData(): Promise<AppointmentTodayIncludesPatient[]>
  save(data: Appointment): Promise<void>
}