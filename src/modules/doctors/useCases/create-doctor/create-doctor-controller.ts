import { Request, Response } from "express";
import { CreateDoctorUseCase } from "./create-doctor-use-case";
import { IUserRepository } from "../../../users/repository/user-repository";
import { ISpecialityRepository } from "../../../specialities/repository/speciality-repository";
import { IDoctorRepository } from "../../repository/doctor-repository";
import { z }  from "zod"
import { validatorSchema } from "../../../../infra/shared/validator/zod";
import { ValidationSchemaError } from "../../../../error/validation-schema-error";

export class CreateDoctorController {

  constructor(
    private userRepository: IUserRepository,
    private doctorRepository: IDoctorRepository,
    private specialityRepository: ISpecialityRepository
  ){}

  async handle(req: Request, res: Response){
    const { body } = req

    const doctorSchema = z.object({
      username: z.string(),
      name: z.string(),
      email: z.string().email({message: 'You need to insert a valid email.'}),
      password: z.string(),
      crm: z.string().length(6, {message: 'CRM must contain 6 caracteres.'}),
      specilityId: z.string().uuid({message: 'You need to insert a valid specility ID.'}),
    })

    try {
      validatorSchema(doctorSchema, body)
      const createDoctorUseCase = new CreateDoctorUseCase(this.userRepository, this.doctorRepository,this.specialityRepository)
      const doctorCreated = await createDoctorUseCase.execute(body)
      return res.status(201).json({doctor: doctorCreated})
    } catch (error: any) {
      if(error instanceof ValidationSchemaError){
        return res.status(error.statusCode).json(error.errors)
      }

      return res.status(400).json({err: error.message})
    }
  }
}