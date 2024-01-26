import { randomUUID } from 'node:crypto'
import { describe, test, expect, beforeAll } from 'vitest'
import { CreateAppointmentUseCase } from '../create-appointment-use-case'
import { PatientMemoryRepository } from '../../../../patients/repository/implementations/in-memory/patient-memory-repository'
import { IPatientRepository } from '../../../../patients/repository/patient-repository'
import { IDoctorRepository } from '../../../../doctors/repository/doctor-repository'
import { DoctorMemoryRepository } from '../../../../doctors/repository/implementations/in-memory/doctor-memory-repository'

describe('🗓️ Create appointment', async () => {
  let patientMemoryRepository: IPatientRepository
  let doctorMemoryRepository: IDoctorRepository

  beforeAll(() => {
    patientMemoryRepository = new PatientMemoryRepository()
    doctorMemoryRepository = new DoctorMemoryRepository()
  })

  test('Should not be able to create an appointment without a patient or with an invalid patient', () => {
    const createAppointmentUseCase = new CreateAppointmentUseCase(patientMemoryRepository, doctorMemoryRepository)
    
    expect(async () => {
      await createAppointmentUseCase.execute({
        doctorId: randomUUID(),
        date: new Date()
      }, 'INVALID_USER_ID',)
    }).rejects.toThrow('Patient does not exists.')
  })

  test('Should not be able to create an appointment without a doctor or with an invalid doctor', async () => {
    const createAppointmentUseCase = new CreateAppointmentUseCase(patientMemoryRepository, doctorMemoryRepository)
    
    const patientCreated = await patientMemoryRepository.save({
      document: '123456',
      email: 'patient@email.com',
      userId: randomUUID(),
    })

    expect(async () => {
      await createAppointmentUseCase.execute({
        doctorId: randomUUID(),
        date: new Date()
      }, patientCreated.userId)
    }).rejects.toThrow('Doctor does not exists.')
  })
})