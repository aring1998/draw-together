import { MessageBody, ConnectedSocket, SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayDisconnect } from '@nestjs/websockets'
import { Server } from 'socket.io'
import * as dayjs from 'dayjs'
import { initBoardData } from 'src/common/utils'
import { suc, fail } from 'src/common/utils/response'
import { DrawRecordService } from 'src/modules/draw-record/draw-record.service'
interface Client {
  uid: string
  drawTime: number
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
  async wsInit(@MessageBody() data: { uid: string; drawTime: number }) {
    const { uid } = data
    this.uid = uid
    this.clients.push({
      ...data,
      created: dayjs().format('YYYY-MM-DD HH:mm:ss.SSS')
    })
    return suc(boardData, '连接初始化成功')
  }

  @SubscribeMessage('draw')
  async handleDraw(@ConnectedSocket() client: any, @MessageBody() data: { index: number; color: string }) {
    const { index, color } = data
    const clientIndex = this.clients.findIndex(item => item.uid === this.uid)
    const drawTime = this.clients[clientIndex].drawTime
    const currentTime = Number(dayjs().unix())
    // TODO 测试版本绘画间隔暂定500毫秒
    if (drawTime !== 0 && currentTime < drawTime + 500) return fail('绘画间隔中')
    this.clients[clientIndex].drawTime = currentTime
    boardData.splice(index, 1, color)
    // 给其它客户端发送通知
    client.broadcast.emit('draw', data)

    this.drawRecordService.save({
      uid: this.uid,
      drawIndex: index,
      drawTime: currentTime.toString(),
      created: dayjs().format('YYYY-MM-DD HH:mm:ss.SSS')
    })
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
