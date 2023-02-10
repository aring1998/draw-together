export const suc = <T>(data: T, message: string = 'success', event?: string) => ({
  code: 0,
  data,
  message,
  event
})

export const fail = (message: string = 'fail') => ({
  code: -1,
  message
})
