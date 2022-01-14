import { Controller, Get, HttpException, Query } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { AppService } from './app.service';

@Controller('data')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  async getData(@Query('url') url: string) {
    // try {
    const datas = await this.appService.getData(url);
    console.log(datas);
    return { statusCode: 200, data: datas };
    // } catch (err) {
    // throw new HttpException(err.response, err.status);
    // }
  }
}