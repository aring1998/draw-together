import { DeepPartial, FindOptionsWhere, Repository, UpdateResult } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

export class BaseSevice<T> {
  constructor(private readonly repository: Repository<T>) {}

  save(data: DeepPartial<T>): Promise<T> {
    return this.repository.save(data)
  }

  saveMany(data: DeepPartial<T>[]): Promise<T[]> {
    return this.repository.save(data)
  }

  find(option: FindOptionsWhere<Partial<T>>): Promise<T[]> {
    return this.repository.findBy(option)
  }

  findOne(option: FindOptionsWhere<Partial<T>>): Promise<T> {
    return this.repository.findOneBy(option)
  }

  deleteById(id: number): Promise<UpdateResult> {
    return this.repository.update(id, { delFlag: 1 } as any)
  }

  update(id: number, params: QueryDeepPartialEntity<T>): Promise<UpdateResult> {
    return this.repository.update(id, params)
  }
}
