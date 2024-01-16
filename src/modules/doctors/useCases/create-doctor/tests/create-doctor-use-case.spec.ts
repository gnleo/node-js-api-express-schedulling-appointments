import {describe, test, expect, beforeAll} from 'vitest'
import { CreateDoctorRequest, CreateDoctorUseCase } from '../create-doctor-use-case'
import { UserMemoryRepository } from '../../../../users/repository/implementations/user-memory-repository'
import { DoctorMemoryRepository } from '../../../repository/implementations/in-memory/doctor-memory-repository'
import { SpecialityMemoryRepository } from '../../../../specialities/repository/implementations/speciality-memory-repository'
import { ISpecialityRepository } from '../../../../specialities/repository/speciality-repository'
import { Speciality } from '../../../../specialities/entities/speciality-entity'


let specialityRepository: ISpecialityRepository
let speciality: Speciality

beforeAll(async () => {
  specialityRepository = new SpecialityMemoryRepository()
  speciality = Speciality.create({
    name: 'nameSpecialityTest',
    description: 'descriptionSpecialityTest'
  })
  
  await specialityRepository.save(speciality)
})

describe('🥼 Doctor use case', () => {
  // Deve ser possível criar uma nova instância de doutor
  test('Should be able to create a new doctor', async () => {
    const doctorMock: CreateDoctorRequest = {
      username: 'userNameTest',
      name: 'nameTest',
      password: 'passwordTest',
      email: 'email@test.com',
      crm: '123456',
      specilityId: speciality.id
    }

    const userRepository = new UserMemoryRepository()
    const doctorRepository = new DoctorMemoryRepository()

    const createDoctorUseCase = new CreateDoctorUseCase(userRepository, doctorRepository, specialityRepository)
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
      specilityId: speciality.id
    }

    const userRepository = new UserMemoryRepository()
    const doctorRepository = new DoctorMemoryRepository()

    const createDoctorUseCase = new CreateDoctorUseCase(userRepository, doctorRepository, specialityRepository)
    
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
      specilityId: speciality.id
    }

    const userRepository = new UserMemoryRepository()
    const doctorRepository = new DoctorMemoryRepository()

    const createDoctorUseCase = new CreateDoctorUseCase(userRepository, doctorRepository, specialityRepository)
    await createDoctorUseCase.execute(doctorMock)

    const newDoctorMockDuplicated: CreateDoctorRequest = {
      username: 'userNameTest2',
      name: 'nameTest2',
      password: 'passwordTest2',
      email: 'email2@test.com',
      crm: '123456',
      specilityId: speciality.id
    }

    expect(async () => {
      await createDoctorUseCase.execute(newDoctorMockDuplicated)
    }).rejects.toThrow('CRM already exists.')
  })
})