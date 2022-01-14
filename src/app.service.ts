import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { lastValueFrom, map } from 'rxjs';
import { urlDto } from './dto/url.dto';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}
  async getData(url: urlDto): Promise<AxiosResponse> {
    const urlSchema = new URL(url.url);
    console.log(urlSchema);
    //get hostname to make branch
    if (urlSchema.hostname === 'www.youtube.com') {
      const special = 'https://www.youtube.com/oembed?url=';
      const query = await this.makeUrl(url);
      const api = special + query;
      const resp = this.httpService.get(api).pipe(map((res) => res.data)); //observable
      const data = await lastValueFrom(resp); // lastValueFrom (await)
      console.log(api);
      return data;
    } else if (urlSchema.hostname === 'www.instagram.com') {
      const special = 'https://api.instagram.com/oembed/?url=';
      const query = await this.makeUrl(url);
      const api = special + query;
      const resp = this.httpService.get(api).pipe(map((res) => res.data)); //observable
      const data = await lastValueFrom(resp); // lastValueFrom (await)
      console.log(api);

      return data;
    } else if (urlSchema.hostname === 'twitter.com') {
      const special = 'https://publish.twitter.com/oembed?url=';
      const query = await this.makeUrl(url);
      const api = special + query;
      const resp = this.httpService.get(api).pipe(map((res) => res.data)); //observable
      const data = await lastValueFrom(resp); // lastValueFrom (await)
      console.log(api);

      return data;
    } else if (urlSchema.hostname === 'vimeo.com') {
      const special = 'https://vimeo.com/api/oembed.json?url=';
      const query = await this.makeUrl(url);
      const api = special + query;
      const resp = this.httpService.get(api).pipe(map((res) => res.data)); //observable
      const data = await lastValueFrom(resp); // lastValueFrom (await)
      console.log(api);

      return data;
    } else if (
      urlSchema.hostname === 'www.flickr.com' ||
      urlSchema.hostname === 'flickr.com'
    ) {
      const special = 'http://www.flickr.com/services/oembed/?url=';
      const query = await this.makeUrl(url);
      const api = special + query;
      console.log(api);
      const resp = this.httpService.get(api).pipe(map((res) => res.data)); //observable
      const data = await lastValueFrom(resp); // lastValueFrom (await)

      return data;
    }
  }

  async makeUrl(url: urlDto): Promise<string> {
    //map으로 변경?
    const urlSchema = new URL(url.url);
    const params = new URLSearchParams(urlSchema.search);
    Object.keys(url).map((query) => {
      params.append(query, url[query].toString());
    });
    console.log(urlSchema.toString() + params.toString());
    return urlSchema.toString() + '&' + params.toString();
  }
}
