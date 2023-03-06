export class BaseResDTO<T> {
  code: number
  message: string
  data?: T
}
