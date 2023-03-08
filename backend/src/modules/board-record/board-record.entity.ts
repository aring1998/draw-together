import { CommonEntity } from 'src/common/utils/base.entity'
import { Entity, Column } from 'typeorm'

@Entity()
export class BoardRecord extends CommonEntity {
  @Column({ comment: '图片地址' })
  imgUrl: string

  @Column({ comment: '最后编辑者uid' })
  lastEditorUid: string
}
