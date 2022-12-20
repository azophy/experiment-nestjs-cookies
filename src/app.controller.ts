import { Controller, Get, Req, Res } from '@nestjs/common';
import { CookieOptions, Request, Response } from 'express'

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
    //const cookieDomain = process.env.COOKIE_DOMAIN || null

    //const cookieOptions: CookieOptions = cookieDomain 
    //? { 
      //domain: cookieDomain,
      //httpOnly: true,
      //sameSite: "none",
    //}
    //: {}
    const cookieOptions = { httpOnly: true, sameSite: 'None' }

    res.cookie('coba', Date.now().toString(), cookieOptions)
    
    return JSON.stringify({ status: 'ok'})
  }
}
