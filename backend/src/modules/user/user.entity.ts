import { AuthEnum } from 'src/common/enums/common.enums'
import { CommonEntity } from 'src/common/utils/base.entity'
import { Entity, Column } from 'typeorm'

@Entity()
export class User extends CommonEntity {
  @Column({ comment: '用户uid' })
  uid: string

  @Column({ comment: '用户名' })
  username: string

  @Column({ comment: '密码' })
  password: string

  @Column({ default: null, comment: '邮箱' })
  email: string

  @Column({ default: 0, comment: '权限：0-普通用户, 1-管理员' })
  auth: AuthEnum

  @Column({ comment: '用户令牌' })
  token: string
}
