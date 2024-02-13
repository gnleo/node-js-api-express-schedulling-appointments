import dayjs from "dayjs";

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

function dateToString(date: Date){
  return dayjs(date).format('YYYY-MM-DD').toString()
}

export { 
  validateTime, 
  formatDateHour, 
  compareEndTimeIsAfter, 
  getDayOfWeek, 
  formatDate,
  dateToString
}