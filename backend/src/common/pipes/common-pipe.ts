import { PipeTransform } from '@nestjs/common'
import { ValidationPayload } from '../utils'

export class CommonPipe implements PipeTransform {
  transform(val: { [key: string]: any }) {
    return ValidationPayload(val)
  }
}
