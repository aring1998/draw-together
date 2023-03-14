import { PipeTransform, Injectable } from '@nestjs/common'
import { BasePageDTO } from '../utils/base.dto'

@Injectable()
export class PaginationPipe implements PipeTransform {
  transform(val: BasePageDTO & { [propName: string]: any }) {
    return {
      ...val,
      page: Number(val.page) || 1,
      pageSize: Number(val.pageSize) || 50
    }
  }
}
