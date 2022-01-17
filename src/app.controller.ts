import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { urlDto } from './dto/url.dto';

@Controller('data')
//consumer's endpoint starts with /data
export class AppController {
  constructor(private readonly appService: AppService) {}

  /* @brief Getting urlScheme's data by using oEmbed API
   * @date 22/01/15
   * @return oEmbed data (json) : data which is derived from oEmbed api
   * @param urlDTO : url query element (urlDTO which is defined in /src/dto/url.dto.ts)
   */
  @Get()
  async getOembedData(@Query() url: urlDto, @Res() res) {
    // get url scheme's elements by query parameters with using urlDTO (defined in /src/dto/url.dto.ts)
    try {
      const datas = await this.appService.getData(url);
      return res.status(HttpStatus.OK).json(datas);
    } catch (err) {
      throw new HttpException(err.response, err.status);
    }
  }
}
