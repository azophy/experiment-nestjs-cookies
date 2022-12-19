import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express'

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHello(): string {
    return 'Hellooooo';
  }

  @Get('/cek_cookies')  
  getCekCookies(@Req() req: Request): string {
    return JSON.stringify(req.cookies)
  }

  @Get('/set_cookies')  
  getSetCookies(@Res({ passthrough: true }) res: Response): string {
    console.log('masuk')
    const cookieDomain = process.env.COOKIE_DOMAIN || null

    const cookieOptions = cookieDomain 
    ? { 
      domain: cookieDomain,
      httpOnly: true,
    }
    : {}

    res.cookie('coba', Date.now(), cookieOptions)
    
    return JSON.stringify({ status: 'ok'})
  }
}
