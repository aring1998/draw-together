import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm'
export class CommonEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Column({ primary: true, comment: '主键id' })
  id: number

  @Column({ type: 'datetime', comment: '创建时间' })
  created: string

  @Column({ default: 0, comment: '删除标志: 0-正常, 1-作废' })
  delFlag: number
}