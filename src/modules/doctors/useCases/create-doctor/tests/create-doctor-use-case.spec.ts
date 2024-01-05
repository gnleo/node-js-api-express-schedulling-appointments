import {describe, test, expect} from 'vitest'
import { CreateDoctorRequest, CreateDoctorUseCase } from '../create-doctor-use-case'
import { randomUUID } from 'crypto'
import { UserMemoryRepository } from '../../../../users/repository/implementations/user-memory-repository'
import { DoctorMemoryRepository } from '../../../repository/implementations/doctor-memory-repository'


describe('🥼 Create a doctor use case', () => {
  // Deve ser possível criar uma nova instância de doutor
  test('Should be able to create a new doctor', async () => {
    const doctorMock: CreateDoctorRequest = {
      username: 'userNameTest',
      name: 'nameTest',
      password: 'passwordTest',
      email: 'email@test.com',
      crm: '123456',
      specilityId: randomUUID(),
    }

    const userRepository = new UserMemoryRepository()
    const doctorRepository = new DoctorMemoryRepository()

    const createDoctorUseCase = new CreateDoctorUseCase(userRepository, doctorRepository)
    const doctorCreated = await createDoctorUseCase.execute(doctorMock)

    expect(doctorCreated).toHaveProperty('id')
    expect(doctorCreated.id).toEqual(expect.any(String))
  })
  
  // Não deve ser possível criar uma nova instância de doutor com CRM menor que 6 dígitos
  test('Should not be able to create a new doctor with CRM length invalid', async () => {
    const doctorMock: CreateDoctorRequest = {
      username: 'userNameTest',
      name: 'nameTest',
      password: 'passwordTest',
      email: 'email@test.com',
      crm: '12345',
      specilityId: randomUUID(),
    }

    const userRepository = new UserMemoryRepository()
    const doctorRepository = new DoctorMemoryRepository()

    const createDoctorUseCase = new CreateDoctorUseCase(userRepository, doctorRepository)
    
    expect(async () => {
      await createDoctorUseCase.execute(doctorMock)
    }).rejects.toThrow('CRM length is incorrect.')
  })

  // Não deve ser possível criar uma nova instância de doutor com um CRM já existente
  test('Should not be able to create a new doctor with exists CRM', async () => {
    const doctorMock: CreateDoctorRequest = {
      username: 'userNameTest',
      name: 'nameTest',
      password: 'passwordTest',
      email: 'email@test.com',
      crm: '123456',
      specilityId: randomUUID(),
    }

    const userRepository = new UserMemoryRepository()
    const doctorRepository = new DoctorMemoryRepository()

    const createDoctorUseCase = new CreateDoctorUseCase(userRepository, doctorRepository)
    await createDoctorUseCase.execute(doctorMock)

    const newDoctorMockDuplicated: CreateDoctorRequest = {
      username: 'userNameTest2',
      name: 'nameTest2',
      password: 'passwordTest2',
      email: 'email2@test.com',
      crm: '123456',
      specilityId: randomUUID(),
    }

    expect(async () => {
      await createDoctorUseCase.execute(newDoctorMockDuplicated)
    }).rejects.toThrow('CRM already exists.')
  })
})