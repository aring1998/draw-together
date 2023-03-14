import { DeepPartial, FindOptionsWhere, Repository, UpdateResult } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { DelFlagEnum } from '../enums/common.enums'
import { getCurrentTime } from './time'

export class BaseSevice<T> {
  constructor(private readonly repository: Repository<T>) {}

  save(data: DeepPartial<T>): Promise<T> {
    return this.repository.save({
      ...data,
      created: getCurrentTime()
    })
  }

  saveMany(data: DeepPartial<T>[]): Promise<T[]> {
    return this.repository.save(
      data.map(item => ({
        ...item,
        created: getCurrentTime()
      }))
    )
  }

  find(option: FindOptionsWhere<Partial<T>>): Promise<T[]> {
    return this.repository.findBy(option)
  }

  findOne(option: FindOptionsWhere<Partial<T>>): Promise<T> {
    return this.repository.findOneBy(option)
  }

  deleteById(id: number): Promise<UpdateResult> {
    return this.repository.update(id, { delFlag: DelFlagEnum.Deleted } as any)
  }

  update(id: number, params: QueryDeepPartialEntity<T>): Promise<UpdateResult> {
    return this.repository.update(id, params)
  }
}
