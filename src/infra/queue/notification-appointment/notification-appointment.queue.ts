import fastq, { queueAsPromised } from "fastq"
import { notificationAppointmentWorker } from "./notification-appointment.worker"
import { AppointmentTodayIncludesPatient } from "../../../modules/appointment/repository/appointment-repository"

export const notificationAppointmentQueue: queueAsPromised<AppointmentTodayIncludesPatient> = fastq.promise(notificationAppointmentWorker, 1)