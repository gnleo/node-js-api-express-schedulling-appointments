import {describe, test, expect} from 'vitest'
import { CreateDoctorRequest, CreateDoctorUseCase } from '../create-doctor-use-case'
import { randomUUID } from 'crypto'
import { UserMemoryRepository } from '../../../../users/repository/implementations/user-memory-repository'
import { DoctorMemoryRepository } from '../../../repository/implementations/doctor-memory-repository'


describe('🥼 Create a doctor use case', () => {
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
})