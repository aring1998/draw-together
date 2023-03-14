import { Body, Controller, Headers, Post, ValidationPipe } from '@nestjs/common'
import { BaseResDTO } from 'src/common/utils/base.dto'
import { suc, fail } from 'src/common/utils/response'
import { UserDTO, UserRegisterDTO } from './classes/user'
import { UserService } from './user.service'
import { v4 as uuidv4 } from 'uuid'
import { getPayload } from 'src/common/utils'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body(ValidationPipe) body: UserRegisterDTO): Promise<BaseResDTO<UserDTO>> {
    const payload = getPayload(body, ['username', 'password', 'email'])
    const { username, email } = payload

    const userInfo = await this.userService.findOne({ username })
    if (userInfo) return fail('该用户名已被注册')

    const emailInfo = await this.userService.findOne({ email })
    if (emailInfo && email) return fail('该邮箱已被使用')

    const res = await this.userService.save({
      ...payload,
      uid: uuidv4(),
      token: uuidv4()
    })
    const { password: _, ...data } = res
    return suc(data, '注册成功，已为您自动登录')
  }

  @Post('login')
  async login(@Body(ValidationPipe) body: UserRegisterDTO): Promise<BaseResDTO<UserDTO>> {
    const { username, password } = getPayload(body, ['username', 'password'])

    const res = await this.userService.findOne({ username })
    if (!res) return fail('用户名不存在')
    if (res.password !== password) return fail('密码错误')

    const { password: _, ...data } = res
    return suc(data, '登录成功')
  }

  @Post('token')
  async token(@Headers('token') token: string): Promise<BaseResDTO<UserDTO>> {
    const data = await this.userService.findOne({ token })
    if (!data) return fail('token已过期，请重新登录')
    return suc(data, `欢迎回来，${data.username}`)
  }
}
