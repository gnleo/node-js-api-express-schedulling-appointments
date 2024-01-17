import dayjs from "dayjs";
import { describe, test, expect, beforeAll } from "vitest";
import { CreateDoctorInfoUseCase, DoctorInfoRequest } from "../create-doctor-info-use-case";
import { IDoctorRepository } from "../../../repository/doctor-repository";
import { DoctorMemoryRepository } from "../../../repository/implementations/in-memory/doctor-memory-repository";
import { randomUUID } from "crypto";
import { IDoctorInfoRepository } from "../../../repository/doctor-info-repository";
import { DoctorInfoMemoryRepository } from "../../../repository/implementations/in-memory/doctor-info-memory-repository";
import { DoctorInfo } from "../../../entities/doctor-info-entity";

describe('🥼ℹ️ Doctor info useCase', () => {
  let doctorRepository: IDoctorRepository
  let doctorInfoRepository: IDoctorInfoRepository
  
  beforeAll(() => {
    doctorRepository = new DoctorMemoryRepository()
    doctorInfoRepository = new DoctorInfoMemoryRepository()
  })
  
  test('Should not be able to create a doctor info if doctor does not exists', async () => {
    const doctorInfo: DoctorInfoRequest = {
      startAt: dayjs().startOf('day').add(10, 'hour').format('HH:mm'), // 10:00
      endAt: dayjs().startOf('day').add(18, 'hour').format('HH:mm'), // 18:00
      price: 150,
      duration: 30,
    }
    
    const createDoctorInfoUseCase = new CreateDoctorInfoUseCase(doctorRepository, doctorInfoRepository)
    
    expect(async () => {
      await createDoctorInfoUseCase.execute(doctorInfo, 'INVALID_USER_ID')
    }).rejects.toThrow('Doctor does not exists.')
  })
  
  test('Should not be able to create a doctor info if endAt is before startAt', async () => {

    const userId = randomUUID()
    await doctorRepository.save({
      crm: '111111',
      email: 'email@test.com',
      id: randomUUID(),
      specialityId: randomUUID(),
      userId
    })

    const doctorInfo: DoctorInfoRequest = {
      startAt: dayjs().startOf('day').add(15, 'hour').format('HH:mm'),
      endAt: dayjs().startOf('day').add(12, 'hour').format('HH:mm'),
      price: 150,
      duration: 30,
    }
    
    const createDoctorInfoUseCase = new CreateDoctorInfoUseCase(doctorRepository, doctorInfoRepository)

    expect(async () => {
      await createDoctorInfoUseCase.execute(doctorInfo, userId)
    }).rejects.toThrow('End time cannot be earlier than start time.')
  })
  
  test('Should not be able to create a doctor info with startAt invalid', async () => {

    const userId = randomUUID()
    await doctorRepository.save({
      crm: '111111',
      email: 'email@test.com',
      id: randomUUID(),
      specialityId: randomUUID(),
      userId
    })

    const doctorInfo: DoctorInfoRequest = {
      startAt: '99:59',
      endAt: dayjs().startOf('day').add(11, 'hour').format('HH:mm'),
      price: 150,
      duration: 30,
    }
    
    const createDoctorInfoUseCase = new CreateDoctorInfoUseCase(doctorRepository, doctorInfoRepository)

    expect(async () => {
      await createDoctorInfoUseCase.execute(doctorInfo, userId)
    }).rejects.toThrow('Invalid startAt.')
  })
  
  test('Should not be able to create a doctor info with endAt invalid', async () => {

    const userId = randomUUID()
    await doctorRepository.save({
      crm: '111111',
      email: 'email@test.com',
      id: randomUUID(),
      specialityId: randomUUID(),
      userId
    })

    const doctorInfo: DoctorInfoRequest = {
      startAt: dayjs().startOf('day').add(15, 'hour').format('HH:mm'),
      endAt: '99:00',
      price: 150,
      duration: 30,
    }
    
    const createDoctorInfoUseCase = new CreateDoctorInfoUseCase(doctorRepository, doctorInfoRepository)

    expect(async () => {
      await createDoctorInfoUseCase.execute(doctorInfo, userId)
    }).rejects.toThrow('Invalid endAt.')
  })

  test('Should be able to create a new doctor info', async () => {
    const userId = randomUUID()
    await doctorRepository.save({
      crm: '111111',
      email: 'email@test.com',
      id: randomUUID(),
      specialityId: randomUUID(),
      userId
    })

    const doctorInfo: DoctorInfoRequest = {
      startAt: dayjs().startOf('day').add(14, 'hour').format('HH:mm'),
      endAt: dayjs().startOf('day').add(15, 'hour').format('HH:mm'),
      price: 150,
      duration: 30,
    }
    
    const createDoctorInfoUseCase = new CreateDoctorInfoUseCase(doctorRepository, doctorInfoRepository)
    const doctorCreated = await createDoctorInfoUseCase.execute(doctorInfo, userId)

    expect(doctorCreated).toHaveProperty('id')
    expect(doctorCreated).toBeInstanceOf(DoctorInfo)
  })
  
  test('Should be able to update a exists doctor info', async () => {
    const userId = randomUUID()
    await doctorRepository.save({
      crm: '111111',
      email: 'email@test.com',
      id: randomUUID(),
      specialityId: randomUUID(),
      userId
    })

    const doctorInfo: DoctorInfoRequest = {
      startAt: dayjs().startOf('day').add(14, 'hour').format('HH:mm'),
      endAt: dayjs().startOf('day').add(15, 'hour').format('HH:mm'),
      price: 150,
      duration: 30,
    }
    
    const createDoctorInfoUseCase = new CreateDoctorInfoUseCase(doctorRepository, doctorInfoRepository)
    const doctorCreated = await createDoctorInfoUseCase.execute(doctorInfo, userId)
    const doctorUpdated = await createDoctorInfoUseCase.execute({...doctorInfo, price: 200}, userId)

    expect(doctorCreated.id).toBe(doctorUpdated.id)
    expect(doctorCreated.price).equal(150)
    expect(doctorUpdated.price).equal(200)
  })
})