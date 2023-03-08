import request from '@/request'
import type { PageRes, PageParams } from '@/types'
import type { BoardRecordItem } from './types/board-record-types'

enum API {
  list = '/boardRecord/list',
}

export function boardRecordList(params: PageParams) {
  return request<PageRes<BoardRecordItem[]>>({
    url: API.list,
    method: 'GET',
    params,
  })
}
