import { IAppointmentRepository } from "../../repository/appointment-repository";
import { notificationAppointmentQueue } from "../../../../infra/queue/notification-appointment/notification-appointment.queue";

export class CreateNotificationAppointmentUseCase {
  constructor(
    private appointmentRepository: IAppointmentRepository
  ){}

  async execute(){
    const appointments = await this.appointmentRepository.findAllAppointmentTodayIncludesPatientData()

    if(appointments.length > 0){
      appointments.forEach(async appointment => {
        await notificationAppointmentQueue.push(appointment)
      });
    }
    return appointments
  }
}