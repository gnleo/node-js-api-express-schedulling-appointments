import { Appointment } from "../entities/appointment-entity"

export type AppointmentsDate = {
  date: Date
} 

export interface IAppointmentRepository {
  findAllSchedulesByDoctorAndDate(doctorId: string, date: string): Promise<AppointmentsDate[]>
  findAppointmentByDoctorAndDateTime(doctorId: string, date: string): Promise<AppointmentsDate | null>
  findAppointmentByPatientAndDateTime(patientId: string, date: string): Promise<AppointmentsDate | null>
  save(data: Appointment): Promise<void>
}