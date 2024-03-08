import { MailTrapMailProvider } from "../../../../infra/providers/mail/implmentations/mail-trap-mail-provider";
import { DoctorPrismaRepository } from "../../../doctors/repository/implementations/prisma/doctor-prisma-repository";
import { DoctorSchedulePrismaRepository } from "../../../doctors/repository/implementations/prisma/doctor-schedule-prisma-repository";
import { PatientPrismaRepository } from "../../../patients/repository/implementations/prisma/patient-prisma-repository";
import { AppointmentPrismaRepository } from "../../repository/prisma/appointment-prisma-repository";
import { CreateAppointmentController } from "./create-appointment-controller";

const patientRepository = new PatientPrismaRepository()
const doctorRepository = new DoctorPrismaRepository()
const doctorSchedule = new DoctorSchedulePrismaRepository()
const appointment = new AppointmentPrismaRepository()
const mailTrap = new MailTrapMailProvider()


const createAppointmentController = new CreateAppointmentController(
  patientRepository,
  doctorRepository,
  doctorSchedule,
  appointment,
  mailTrap
)

export { createAppointmentController }