import { Controller, Get, Query, Redirect, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express'

@Controller()
export class AppController {
  constructor() {}

  @Get('/get_cookies')  
  getGetCookies(@Req() req: Request): string {
    return JSON.stringify(req.cookies)
  }

  @Get('/set_cookies')  
  getSetCookies(@Res({ passthrough: true }) res: Response): string {
    console.log('accessing /set_cookies')

    res.cookie('example_cookie', Date.now().toString(), {
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
    console.log('access getSetCookiesAndRedirect')

    if (query.cookie_domain) {
      res.cookie('example_cookie_redirect', Date.now().toString(), {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        domain: query.cookie_domain,
      })
    } else {
      res.cookie('example_cookie_redirect', Date.now().toString(), {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
    }
    
    return { url: query.redirect_url }
  }
}
