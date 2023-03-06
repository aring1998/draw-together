export const suc = <T>(data: T, message: string = 'success', event?: string) => ({
  code: 200,
  data,
  message,
  event
})

export const fail = (message: string = 'fail') => ({
  code: 500,
  message
})
