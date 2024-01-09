import { Request, Response } from "express";
import { CreateDoctorUseCase } from "./create-doctor-use-case";
import { IUserRepository } from "../../../users/repository/user-repository";
import { ISpecialityRepository } from "../../../specialities/repository/speciality-repository";
import { IDoctorRepository } from "../../repository/doctor-repository";

export class CreateDoctorController {

  constructor(
    private userRepository: IUserRepository,
    private doctorRepository: IDoctorRepository,
    private specialityRepository: ISpecialityRepository
  ){}

  async handle(req: Request, res: Response){
    const { body } = req
    const createDoctorUseCase = new CreateDoctorUseCase(this.userRepository, this.doctorRepository,this.specialityRepository)
    const doctorCreated = await createDoctorUseCase.execute(body)
    return res.status(201).json({doctor: doctorCreated})
  }
}