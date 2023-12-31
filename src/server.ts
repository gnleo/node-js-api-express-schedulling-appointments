import cors from 'cors'
import express from 'express'
import { userRouter } from './routes/user-routes'
import { specialityRouter } from './routes/speciality.routes'

import swaggerUI from 'swagger-ui-express'
import swaggerDocument from '../swagger.json'
import { doctorRouter } from './routes/doctor-routes'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.use(userRouter)
app.use(specialityRouter)
app.use(doctorRouter)

app.listen(3000, () => console.log('server is running on Port 3000'))