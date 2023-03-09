import { MessageBody, ConnectedSocket, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import * as dayjs from 'dayjs'
import { initBoardData } from 'src/common/utils'
import { suc, fail } from 'src/common/utils/response'
import { DrawRecordService } from 'src/modules/draw-record/draw-record.service'
import { Cron } from '@nestjs/schedule/dist/decorators'
import { CronExpression } from '@nestjs/schedule/dist/enums'
import { getBoardData, saveBoardData } from './methods/board-data'
import { saveDrawCanvas } from './methods/draw-canvas'
import { BoardRecordService } from 'src/modules/board-record/board-record.service'
import { getCurrentTime, getCurrentTimeStamp } from 'src/common/utils/time'
import { v4 as uuidv4 } from 'uuid'
import { UserDTO } from 'src/modules/user/classes/user'

interface Client {
  username: string
  uid: string
  drawTime: number
  created: string
}

const TIME_INTERVAL = 500
const boardData = getBoardData() || initBoardData()

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class EventsGateway {
  constructor(private readonly drawRecordService: DrawRecordService, private readonly boardRecordService: BoardRecordService) {}
  private clients: Client[] = []

  @WebSocketServer()
  server: Server

  @SubscribeMessage('init')
  async wsInit(@ConnectedSocket() client: Socket, @MessageBody() data: UserDTO) {
    const { username, uid = uuidv4() } = data
    const clientInfo = {
      username: username ?? '游客',
      uid,
      drawTime: getCurrentTimeStamp() - TIME_INTERVAL,
      created: getCurrentTime()
    }
    const clientIndex = this.clients.findIndex(item => item.uid === uid)
    if (clientIndex === -1) this.clients.push(clientInfo)
    client.on('disconnect', () => {
      this.clients.splice(clientIndex, 1)
      client.broadcast.emit('clients', this.clients)
    })
    this.sendClientsData(client)
    return suc({ clientInfo, boardData }, '连接初始化成功')
  }

  @SubscribeMessage('draw')
  async handleDraw(@ConnectedSocket() client: Socket, @MessageBody() data: { uid: string; index: number; color: string }) {
    const { uid, index, color } = data
    const clientIndex = this.clients.findIndex(item => item.uid === uid)
    if (clientIndex === -1) return fail('与服务器失去链接，请尝试刷新页面')
    const drawTime = this.clients[clientIndex].drawTime
    const currentTime = Number(dayjs().valueOf())
    // TODO 测试版本绘画间隔暂定500毫秒
    if (drawTime !== 0 && currentTime < drawTime + TIME_INTERVAL) return fail('绘画间隔中')
    this.clients[clientIndex].drawTime = currentTime
    boardData.splice(index, 1, color)
    // 给其它客户端发送通知
    client.broadcast.emit('draw', data)

    this.drawRecordService.save({
      uid,
      drawIndex: index,
      drawTime: currentTime.toString(),
      created: getCurrentTime()
    })
    return suc(data, '绘制成功', 'draw')
  }

  @SubscribeMessage('login')
  async handleUserLogin(@ConnectedSocket() client: Socket, @MessageBody() data: UserDTO & { oldUid: string }) {
    const { username, uid, oldUid } = data
    const clientIndex = this.clients.findIndex(item => item.uid === oldUid)
    this.clients[clientIndex] = {
      ...this.clients[clientIndex],
      username,
      uid
    }
    this.sendClientsData(client)
    return this.clients[clientIndex]
  }

  @SubscribeMessage('getColor')
  getColor(@MessageBody() index: number) {
    const data = boardData[index]
    return suc(data, '')
  }

  // 定时备份画板数据
  @Cron(CronExpression.EVERY_HOUR)
  async saveBoardData() {
    const res = await this.drawRecordService.findLastRecord()
    if (dayjs(dayjs()).diff(dayjs(res.created), 'hour') !== 0) return
    saveBoardData(boardData)
    const imgUrl = saveDrawCanvas(boardData)
    if (!imgUrl) return
    this.boardRecordService.save({ imgUrl, lastEditorUid: res.uid })
  }

  sendClientsData(client: Socket) {
    client.emit('clients', this.clients)
    client.broadcast.emit('clients', this.clients)
  }
}
