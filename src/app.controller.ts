import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express'
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/cek_cookies')  
  getCekCookies(@Req() req: Request): string {
    return JSON.stringify(req.cookies)
  }

  @Get('/set_cookies')  
  getSetCookies(@Res() res: Response): string {
    console.log('masuk')
    res.cookie('coba', Date.now())
     return JSON.stringify({ status: 'ok'})
  }
}
