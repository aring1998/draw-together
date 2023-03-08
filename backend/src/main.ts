import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './http-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('/api').enableCors()
  app.useGlobalFilters(new HttpExceptionFilter())
  await app.listen(3525, () => {
    Logger.log('sever running at http://localhost:3525/api')
  })
}
bootstrap()
