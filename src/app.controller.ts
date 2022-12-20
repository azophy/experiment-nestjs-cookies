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
    })
    
    return JSON.stringify({ status: 'ok'})
  }

  @Get('/set_cookies_and_redirect')
  @Redirect('', 302)
  getSetCookiesAndRedirect(
    @Res({ passthrough: true }) res: Response,
    @Query() query: { redirect_url: string }
  ) {
    console.log('masuk getSetCookiesAndRedirect')

    /* ini harusnya akan mereturn url host utamanya. misal kalau 
    redirect_url = 'http://localhost:3005/contoh.html', host
    nya adalah 'localhost:3005 */
    const cookie_domain = (new URL(query.redirect_url)).host;

    res.cookie('coba_redirect', Date.now().toString(), {
      httpOnly: true,
      sameSite: "none",
      domain: '.' + cookie_domain,
    })
    
    return { url: query.redirect_url }
  }
}
