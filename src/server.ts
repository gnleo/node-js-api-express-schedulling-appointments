import express from 'express'
import { userRouter } from './routes/user-routes'
import { specialityRouter } from './routes/speciality.routes'

const app = express()

app.use(express.json())

app.use(userRouter)
app.use(specialityRouter)

app.listen(3000, () => console.log('server is running on Port 3000'))