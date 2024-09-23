import cron from "node-cron"
import { CreateNotificationAppointmentUseCase } from "../../modules/appointment/useCases/create-notification-appointment/create-notification-appointment-use-case"
import { AppointmentPrismaRepository } from "../../modules/appointment/repository/prisma/appointment-prisma-repository"
import { MailTrapMailProvider } from "../providers/mail/implmentations/mail-trap-mail-provider"

console.log('NOTIFICATION FILE')
cron.schedule('*/10 * * * * *', async () => {
  console.log('running cron schedule')
  const appointmentRepository = new AppointmentPrismaRepository()
  const mailProvider = new MailTrapMailProvider()
  const notificationAppointment = new CreateNotificationAppointmentUseCase(appointmentRepository, mailProvider)

  const result = await notificationAppointment.execute()
  console.log("🚀 ~ cron.schedule ~ result:", result)
})

