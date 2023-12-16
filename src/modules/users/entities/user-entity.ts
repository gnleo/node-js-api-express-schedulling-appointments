import { randomUUID } from "node:crypto"

type IUser = {
  name: string
  password: string
  username: string
}

export class User {
  name: string
  password: string
  username: string
  id: string
  isAdmin: boolean

  private constructor(props: IUser){
    this.id = randomUUID()
    this.name = props.name
    this.username = props.username
    this.password = props.password
    this.isAdmin = false
  }

  static create(props: IUser){
    const user = new User(props)
    return user
  }
}