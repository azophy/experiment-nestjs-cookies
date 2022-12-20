import { Controller, Get, Query, Redirect, Req, Res } from '@nestjs/common';
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
    // const cookieOptions = { httpOnly: true, sameSite: "none" }

    res.cookie('coba', Date.now().toString(), {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    })
    
    return JSON.stringify({ status: 'ok'})
  }

  @Get('/set_cookies_and_redirect')
  @Redirect('', 302)
  getSetCookiesAndRedirect(
    @Res({ passthrough: true }) res: Response,
    @Query() query: { redirect_url: string, cookie_domain?: string }
  ) {
    console.log('masuk getSetCookiesAndRedirect')

    if (query.cookie_domain) {
      res.cookie('coba_redirect', Date.now().toString(), {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        domain: query.cookie_domain,
      })
    } else {
      res.cookie('coba_redirect', Date.now().toString(), {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
    }
    
    return { url: query.redirect_url }
  }
}
