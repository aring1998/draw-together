import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return `
      <p>Hello! Welcome to DrawTogether API</p>
      <p>Web sever running at <a href="https://aring.cc/draw-together" target="_blank">https://aring.cc/draw-together</a></p>
      <p>
        Read source code at: 
        <a href="https://gitee.com/aring1998/draw-together" target="_blank">Gitee</a>
        <span> , </span>
        <a href="https://github.com/aring1998/draw-together" target="_blank">GitHub</a>
      </p>
    `
  }
}
