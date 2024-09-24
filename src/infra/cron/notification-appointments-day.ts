import cron from "node-cron"
import { CreateNotificationAppointmentUseCase } from "../../modules/appointment/useCases/create-notification-appointment/create-notification-appointment-use-case"
import { AppointmentPrismaRepository } from "../../modules/appointment/repository/prisma/appointment-prisma-repository"

// cron.schedule('*/10 * * * * *', async () => { //tests
cron.schedule('0 0 0 * * *', async () => {
  console.log('running cron schedule')
  const appointmentRepository = new AppointmentPrismaRepository()
  const notificationAppointment = new CreateNotificationAppointmentUseCase(appointmentRepository)

  await notificationAppointment.execute()
})

