import { MessageBody, ConnectedSocket, SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayDisconnect } from '@nestjs/websockets'
import { Server } from 'socket.io'
import * as moment from 'moment'
import { initBoardData } from 'src/common/utils'
import { suc, fail } from 'src/common/utils/response'
import { DrawRecordService } from 'src/modules/draw-record/draw-record.service'
interface Client {
  uid: string
  created: string
}
const boardData = initBoardData()

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class EventsGateway implements OnGatewayDisconnect {
  constructor(private readonly drawRecordService: DrawRecordService) {}
  private uid = ''
  private clients: Client[] = []

  @WebSocketServer()
  server: Server

  @SubscribeMessage('init')
  wsInit(@MessageBody() data: { uid: string }) {
    this.uid = data.uid
    this.clients.push({
      ...data,
      created: moment().format('YYYY-MM-DD HH:mm:ss')
    })
    return suc(boardData, '')
  }

  @SubscribeMessage('draw')
  async handleDraw(@ConnectedSocket() client: any, @MessageBody() data: { index: number; color: string }) {
    const { index, color } = data
    const res = await this.drawRecordService.findLastRecordByUid(this.uid)
    const drawTime = Number(res?.drawTime)
    // TODO 测试版本绘画间隔暂定500毫秒
    if (Number(moment().format('x')) < drawTime + 500) return fail('绘画间隔中')
    await this.drawRecordService.save({
      uid: this.uid,
      drawIndex: index,
      drawTime: moment().format('x'),
      created: moment().format('YYYY-MM-DD HH:mm:ss')
    })

    boardData.splice(index, 1, color)
    // 给其它客户端发送通知
    client.broadcast.emit('draw', data)
    return suc(data, '绘制成功', 'draw')
  }

  @SubscribeMessage('getColor')
  getColor(@MessageBody() index: number) {
    const data = boardData[index]
    return suc(data, '')
  }

  handleDisconnect() {
    const index = this.clients.findIndex(item => item.uid)
    this.clients.splice(index, 1)
  }
}
