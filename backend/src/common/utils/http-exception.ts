import { HttpException } from '@nestjs/common'

export function noAuth() {
  throw new HttpException('您没有操作权限', 403)
}
