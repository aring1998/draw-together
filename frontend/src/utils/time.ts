import { dayjs } from 'element-plus'

export function formatDate(date: Date, format = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(date).format(format)
}
