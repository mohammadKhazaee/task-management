import { Controller, Get, Param, UseGuards, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@UseGuards(AuthGuard())
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/userPhoto/:userId')
  getUserPhoto(
    @Param('userId') userId,
    @Res() res,
  ): Promise<Observable<object>> {
    return this.appService.getUserPhoto(userId, res);
  }
}
