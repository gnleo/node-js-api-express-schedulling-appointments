import { aw } from "vitest/dist/reporters-O4LBziQ_"
import { PasswordBcrypt } from "../../shared/crypto/password-bcrypt"
import { prisma } from "../prisma-config"

async function main(){
  const password = await new PasswordBcrypt().hash('admin')

  await prisma.user.create({
    data: {
      name: 'Admin',
      username: 'admin',
      isAdmin: true,
      password
    }
  })

}

main()