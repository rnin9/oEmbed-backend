import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}
  async getData(url: string): Promise<Observable<AxiosResponse<any, any>>> {
    return this.httpService.get(url);
  }
}
