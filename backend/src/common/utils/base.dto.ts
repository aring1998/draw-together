import { IsNumberString, IsOptional, MaxLength, MinLength, NotContains } from 'class-validator'

export class BaseResDTO<T> {
  code: number
  message: string
  data?: T
}

export class BasePageDTO {
  @IsOptional()
  @IsNumberString()
  @NotContains('-')
  @MinLength(1)
  @MaxLength(3)
  page: number

  @IsOptional()
  @IsNumberString()
  @NotContains('-')
  @MinLength(1)
  @MaxLength(3)
  pageSize: number
}

export class BasePageDataDTO<T> extends BasePageDTO {
  records: T
  total: number
}

export class BasePageResDTO<T> extends BaseResDTO<BasePageDataDTO<T>> {}
