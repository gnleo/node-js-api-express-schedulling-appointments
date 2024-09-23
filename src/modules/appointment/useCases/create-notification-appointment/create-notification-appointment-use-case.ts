import { IMailProvider } from "../../../../infra/providers/mail/mail-provider";
import { formatDate } from "../../../../utils/date";
import { IAppointmentRepository } from "../../repository/appointment-repository";

export class CreateNotificationAppointmentUseCase {
  constructor(
    private appointmentRepository: IAppointmentRepository,
    private mailProvider: IMailProvider
  ){}

  async execute(){
    const appointments = await this.appointmentRepository.findAllAppointmentTodayIncludesPatientData()

    appointments.forEach(async appointment => {
      const patientEmail = appointment.patient.email
      const patientName = appointment.patient.user.name
      const doctorName = appointment.doctor.user.name
      const date = appointment.date

      await this.mailProvider.sendMail({
        to: patientEmail,
        from: 'Agendamento de consulta <noreplay@agendamedico.com.br>',
        html: `Olá ${patientName}, <br/>
        Não se esqueça da sua <b>consulta</b> com o médico <b>${doctorName}</b> hoje às ${formatDate(date, 'HH:mm')}`,
        subject: 'Lembrete de agendamento de consulta.'
      })
    });
    return appointments
  }
}