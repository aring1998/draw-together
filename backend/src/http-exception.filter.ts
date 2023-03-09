import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'
import { Request, Response } from 'express'
import { getCurrentTime } from './common/utils/time'

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
    const date = getCurrentTime()
    if (!exception.getStatus) {
      return response.status(500).json({
        statusCode: 500,
        date,
        path: request.url,
        message: exception.message
      })
    }
    const status = exception.getStatus()
    let { message } = exception.getResponse().valueOf() as httpError
    if (!message) message = exception.message

    response.status(status).json({
      statusCode: status,
      date,
      path: request.url,
      message
    })
  }
}
