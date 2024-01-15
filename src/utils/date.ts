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

export {validateTime, formatDateHour, compareEndTimeIsAfter}