import { Controller, Get, HttpException, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { urlDto } from './dto/url.dto';

@Controller('data')
//consumer endpoint starts with /data
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('/')
  async getData(@Query() url: urlDto) {
    // get url schema by query objects using urlDTO
    try {
      const datas = await this.appService.getData(url);
      return { statusCode: 200, data: datas };
    } catch (err) {
      throw new HttpException(err.response, err.status);
    }
  }
}
