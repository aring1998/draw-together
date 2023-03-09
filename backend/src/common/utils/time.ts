import * as dayjs from 'dayjs';

export function getCurrentTime(format = 'YYYY-MM-DD HH:mm:ss.SSS') {
  return dayjs().format(format)
}
export function getCurrentTimeStamp() {
  return dayjs().valueOf()
}