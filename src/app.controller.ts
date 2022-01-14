import { Controller, Get, HttpException, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('data')
//consumer endpoint starts with /data
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('/')
  async getData(@Query('url') url: string) {
    // get url schema by query object
    try {
      const datas = await this.appService.getData(url);
      return { statusCode: 200, data: datas };
    } catch (err) {
      throw new HttpException(err.response, err.status);
    }
  }
}
