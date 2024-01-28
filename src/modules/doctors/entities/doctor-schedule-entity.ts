import { randomUUID } from "crypto"
import { CustomError } from "../../../error/custom-error"
import { compareEndTimeIsAfter, validateTime } from "../../../utils/date"

type DoctorScheduleProps ={ 
  doctorId: string
  schedules: Schedules[]
}

type Schedules = {
  id?: string
  endAt: string
  startAt: string
  dayOfWeek: number
}

export class DoctorSchedule {

  doctorId: string
  schedules: Schedules[]

  constructor(props: DoctorScheduleProps){
    if(!props.schedules){
      throw new CustomError('Invalid Schedules.', 400)
    }

    validDuplicateSchedules(props.schedules)

    validateTimes(props.schedules)

    this.doctorId = props.doctorId
    this.schedules = createSchedules(props.schedules)
  }

  static create(data: DoctorScheduleProps){
    const doctorSchedule = new DoctorSchedule(data)
    return doctorSchedule
  }

}

const validDuplicateSchedules = (schedules: Schedules[]) => {
  const hasUniqueValue = new Set(schedules.map(value => value.dayOfWeek))

  if(hasUniqueValue.size < schedules.length) {
    throw new CustomError('Duplicate day of week.', 422)
  }
}

const validateTimes = (schedules: Schedules[]) => {
  schedules.forEach(schedule => {

    if(!validateTime(schedule.startAt)){
      throw new CustomError('Invalid startAt.')
    }
  
    if(!validateTime(schedule.endAt)){
      throw new CustomError('Invalid endAt.')
    }
  
    if(!compareEndTimeIsAfter(schedule.startAt, schedule.endAt)){
      throw new CustomError('End time cannot be earlier than start time.')
    }
  })
}

const createSchedules = (schedules: Schedules[]) => {
  return schedules.map(schedule => {
    return { id: randomUUID(), ...schedule }
  })
}