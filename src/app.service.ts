import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map, Observable } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}
  async getData(url: string): Promise<Observable<AxiosResponse<any, any>>> {
    const api = 'http://flickr.com/services/oembed?url=' + url;
    console.log(api);
    const data = await this.httpService.get(api);
    console.log({ datas: data });
    return data;
  }
}
