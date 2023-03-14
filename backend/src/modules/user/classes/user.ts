import { IsNotEmpty, IsOptional, Length, IsEmail, IsString } from 'class-validator'
import { AuthEnum } from 'src/common/enums/common.enums'

export class UserDTO {
  id: number
  username: string
  token: string
  email: string
  uid: string
  auth: AuthEnum
}

export class UserLoginDTO {
  @IsNotEmpty()
  @IsString()
  @Length(4, 16)
  username: string

  @IsNotEmpty()
  @Length(6, 32)
  password: string
}

export class UserRegisterDTO extends UserLoginDTO {
  @IsOptional()
  @IsEmail()
  email: string
}
