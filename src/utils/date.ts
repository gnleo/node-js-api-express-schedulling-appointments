import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc)

function validateTime(time: string){
  return dayjs(formatDateHour(time)).isValid()
}

function formatDateHour(time: string){
  const date = dayjs().format('YYYY-MM-DD ') // 2024-01-14
  const dateTimeFormat = new Date(`${date} ${time}`) // 2024-01-14 21:43

  return dayjs(dateTimeFormat)
}

function compareEndTimeIsAfter(startTime: string, endTime: string){
  return formatDateHour(endTime).isAfter(formatDateHour(startTime))
}

function getDayOfWeek(date: string) {
  return dayjs(date).day()
}

function formatDate(date: Date, format: string){
  return dayjs(date).format(format)
}

function formatDateUTC(date: Date, format: string){
  return dayjs(date).utc().format(format)
}

function dateToString(date: Date){
  return dayjs(date).format('YYYY-MM-DD').toString()
}

export function toDate (date: Date) {
  return dayjs(date).toDate()
}

export { 
  validateTime, 
  formatDateHour, 
  compareEndTimeIsAfter, 
  getDayOfWeek, 
  formatDate,
  dateToString,
  formatDateUTC
}