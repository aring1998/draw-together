import { MessageBody, ConnectedSocket, SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayDisconnect } from '@nestjs/websockets'
import { Server } from 'socket.io'
import * as moment from 'moment'
import { initBoardData } from 'src/utils'
import { suc } from 'src/utils/response'
const boardData = initBoardData()
const clients = []

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class EventsGateway {
  @WebSocketServer()
  server: Server

  @SubscribeMessage('init')
  wsInit(@MessageBody() data: { uid: string }) {
    clients.push({
      ...data,
      created: moment().format('YYYY-MM-DD HH:mm:ss')
    })
    return suc(boardData, '')
  }

  @SubscribeMessage('draw')
  handleDraw(@ConnectedSocket() client: any, @MessageBody() data: { index: number; color: string }) {
    boardData.splice(data.index, 1, data.color)
    // 给其它客户端发送通知
    client.broadcast.emit('draw', data)
    return suc(data, '绘制成功', 'draw')
  }

  @SubscribeMessage('getColor')
  getColor( @MessageBody() index: number) {
    const data = boardData[index]
    return suc(data, '')
  }
}
