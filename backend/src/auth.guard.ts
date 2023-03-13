import { CanActivate, ExecutionContext, HttpException, Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'
import { Request } from 'express'
import { UserService } from './modules/user/user.service'
import { noAuth } from './common/utils/http-exception'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>()
    const token = request.headers.token?.toString()
    if (!token) noAuth()
    return this.valiAuth(token, request)
  }
  async valiAuth(token: string, req: Request) {
    const userInfo = await this.userService.findOne({ token })
    if (!userInfo?.auth) noAuth()
    req.body.userInfo = userInfo
    return true
  }
}
