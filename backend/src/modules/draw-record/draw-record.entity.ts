import { CommonEntity } from 'src/common/utils/base.entity'
import {  Entity, Column } from 'typeorm'

@Entity()
export class DrawRecord extends CommonEntity {
  @Column({ comment: '客户端uid' })
  uid: string

  @Column({ comment: '绘画位置下标' })
  drawIndex: number

  @Column({ comment: '绘画时间戳' })
  drawTime: string
}
