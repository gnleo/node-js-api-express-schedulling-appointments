import cors from 'cors'
import express from 'express'

import swaggerUI from 'swagger-ui-express'
import swaggerDocument from '../swagger.json'
import { router } from './routes'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.use(router)

app.listen(3000, () => console.log('server is running on Port 3000'))