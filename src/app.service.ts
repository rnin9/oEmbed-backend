import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { lastValueFrom, map } from 'rxjs';
import { urlDto } from './dto/url.dto';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}
  async getData(url: urlDto): Promise<AxiosResponse> {
    const api =
      'http://www.flickr.com/services/oembed/?format=json&url=' + url.url;
    const resp = this.httpService.get(api).pipe(map((res) => res.data)); //observable
    const data = await lastValueFrom(resp); // lastValueFrom (await)
    return data;
  }
}
