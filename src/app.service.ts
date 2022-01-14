import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}
  async getData(url: string): Promise<AxiosResponse> {
    const api = 'http://www.flickr.com/services/oembed/?format=json&url=' + url;
    // try {
    console.log(api);
    const resp = await this.httpService.get(api).pipe(map((res) => res.data));
    const data = await lastValueFrom(resp);
    console.log({ res: resp, datas: data });
    return data;
    // } catch (err) {
    // console.log(err);
    // }
  }
}
