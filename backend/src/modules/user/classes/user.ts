import { IsNotEmpty, IsOptional, IsEnum, Length, IsEmail, IsString } from 'class-validator'

export class UserDTO {
  id: number
  username: string
  token: string
  email: string
  uid: string
  auth: number
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
