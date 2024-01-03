import {test, expect, describe} from 'vitest'
import { Doctor } from '../doctor-entity'

describe('DOCTOR ENTITY', () => {
  test('Should be able to create a new doctor', () => {
    const doctor = Doctor.create({
      crm: '123456',
      userId: 'user_id',
      specialityId: 'speciality_id'
    })
  
    expect(doctor).toBeInstanceOf(Doctor)
    expect(doctor).toHaveProperty('id')
    expect(doctor.id).toEqual(expect.any(String))
  })
  
  test('Should not be able to create a new doctor with CRM invalid', () => {
    expect(() => {
      Doctor.create({
      crm: '',
      userId: 'user_id',
      specialityId: 'speciality_id'})
    }).toThrow('CRM is required.')
  })
  
  test('Should not be able to create a new doctor with CRM length invalid', () => {
    expect(() => {
      Doctor.create({
        crm: '123',
        userId: 'user_id',
        specialityId: 'speciality_id'})
    }).toThrow('CRM length is incorrect.')
  })

})
