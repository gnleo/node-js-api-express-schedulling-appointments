import { AppointmentTodayIncludesPatient } from "../../../modules/appointment/repository/appointment-repository";
import { formatDate } from "../../../utils/date";
import { MailTrapMailProvider } from "../../providers/mail/implmentations/mail-trap-mail-provider";

const mailProvider = new MailTrapMailProvider()

export async function notificationAppointmentWorker(data: AppointmentTodayIncludesPatient): Promise<void> {

  const patientEmail = data.patient.email
  const patientName = data.patient.user.name
  const doctorName = data.doctor.user.name
  const date = data.date

  console.log(`WORKER: Disparando email para ${patientEmail}`)
  
  await mailProvider.sendMail({
    to: patientEmail,
    from: 'Agendamento de consulta <noreplay@agendamedico.com.br>',
    html: `Olá ${patientName}, <br/>
    Não se esqueça da sua <b>consulta</b> com o médico <b>${doctorName}</b> hoje às ${formatDate(date, 'HH:mm')}`,
    subject: 'Lembrete de agendamento de consulta.'
  })
} 