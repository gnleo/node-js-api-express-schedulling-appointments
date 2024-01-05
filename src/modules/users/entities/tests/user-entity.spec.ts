import {test, describe, expect} from 'vitest'
import { User } from '../user-entity'

describe('👤 User entity', () => {
  test('Should be able a new user', async () => {
    const user = await User.create({
      username: 'userNameTest',
      name: 'nameTest',
      password: 'passwordTest'
    })

    expect(user).toBeInstanceOf(User)
    expect(user).toHaveProperty('id')
    expect(user.password).not.equal('passwordTest')
  })
})