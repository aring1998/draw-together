import { IsNumber, IsOptional, Max, Min } from 'class-validator'

export class BaseResDTO<T> {
  code: number
  message: string
  data?: T
}

export class BasePageDTO {
  @IsOptional()
  @IsNumber()
  @Min(1)
  page: number

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(500)
  pageSize: number
}

export class BasePageDataDTO<T> extends BasePageDTO {
  records: T
  total: number
}

export class BasePageResDTO<T> extends BaseResDTO<BasePageDataDTO<T>> {}
