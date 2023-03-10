import request from '@/request'
import type { PageParams, PageRes } from '@/types'
import type { DrawRecordItem } from './types/draw-record-types'

enum API {
  findDiligentUser = '/drawRecord/findDiligentUser',
}

export function findDiligentUser(params: PageParams) {
  return request<PageRes<DrawRecordItem[]>>({
    url: API.findDiligentUser,
    method: 'GET',
    params,
  })
}
