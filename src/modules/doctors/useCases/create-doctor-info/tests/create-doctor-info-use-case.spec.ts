import dayjs from "dayjs";
import { describe, test, expect, beforeAll } from "vitest";
import { CreateDoctorInfoUseCase, DoctorInfoRequest } from "../create-doctor-info-use-case";
import { IDoctorRepository } from "../../../repository/doctor-repository";
import { DoctorMemoryRepository } from "../../../repository/implementations/doctor-memory-repository";

describe('🥼ℹ️ Doctor info useCase', () => {
  let doctorRepository: IDoctorRepository
  
  beforeAll(() => {
    doctorRepository = new DoctorMemoryRepository()
  })
  
  test('Should not be able to create a doctor info if doctor does not exists', async () => {
    const doctorInfo: DoctorInfoRequest = {
      startAt: dayjs().startOf('day').add(10, 'hour').format('HH:mm'), // 10:00
      endAt: dayjs().startOf('day').add(18, 'hour').format('HH:mm'), // 18:00
      price: 150,
      duration: 30,
    }
    
    const createDoctorInfoUseCase = new CreateDoctorInfoUseCase(doctorRepository)
    

    expect(async () => {
      await createDoctorInfoUseCase.execute(doctorInfo, 'INVALID_USER_ID')
    }).rejects.toThrow('Doctor does not exists.')
  })
})