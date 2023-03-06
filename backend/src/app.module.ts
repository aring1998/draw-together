import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { EventsModule } from './web-socket/ws.module'
import { DrawRecord } from './modules/draw-record/draw-record.entity'
import { DrawRecordModule } from './modules/draw-record/draw-record.module'
import * as dotenv from 'dotenv'
import { AppMiddleware } from './app.middleware'
import { User } from './modules/user/user.entity'
import { UserModule } from './modules/user/user,module'

dotenv.config()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [DrawRecord, User],
      synchronize: true
    }),
    EventsModule,
    DrawRecordModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppMiddleware).forRoutes('/')
  }
}
