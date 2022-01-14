import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { catchError, lastValueFrom, map } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}
  async getData(url: string): Promise<AxiosResponse> {
    const api = 'http://www.flickr.com/services/oembed/?format=json&url=' + url;
    const resp = this.httpService.get(api).pipe(map((res) => res.data)); //observable
    const data = await lastValueFrom(resp); // lastValueFrom (await)
    return data;
  }
}
