import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'
import { Request, Response } from 'express'
import * as dayjs from 'dayjs'

interface httpError {
  statusCode: number
  message: string | string[]
  error: string
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = exception.getStatus()
    let { message } = exception.getResponse().valueOf() as httpError
    if (!message) message = exception.message

    response.status(status).json({
      statusCode: status,
      date: dayjs().format('YYYY-MM-DD HH:mm:ss.SSS'),
      path: request.url,
      message
    })
  }
}
