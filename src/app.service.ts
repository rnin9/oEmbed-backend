import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { lastValueFrom, map } from 'rxjs';
import { urlDto } from './dto/url.dto';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}
  //Getting oembed data Main Logic
  async getData(urlData: urlDto): Promise<AxiosResponse> {
    const urlSchema = new URL(urlData.url);
    //make url process, use two async function parallelly with promise.all()
    const api = await Promise.all([
      //selecting api by url's hostname
      this.selectApi(urlSchema.hostname).catch((err) => {
        return err;
      }),
      //make query url with parameters made by urlDto elements
      this.makeQuery(urlData).catch((err) => {
        return err;
      }),
    ]).then((subUrls) => subUrls.join('+'));
    //using Rxjs to get Data when api URL Ready.
    const resp = this.httpService.get(api).pipe(map((res) => res.data));
    // subscribe and await until operation finished, and convert to promise
    const data = await lastValueFrom(resp);
    return data;
  }
  //Query url making Logic
  async makeQuery(url: urlDto): Promise<string> {
    const urlSchema = new URL(url.url);
    const params = new URLSearchParams(urlSchema.search);
    //append all parameters which is in urlDto element to url
    Object.keys(url).map((query) => {
      params.append(query, url[query].toString());
    });
    return urlSchema.toString() + '&' + params.toString();
  }

  //select api by hostname
  async selectApi(hostname: string): Promise<string> {
    //selecting api logic
    if (hostname === 'www.youtube.com') {
      return 'https://www.youtube.com/oembed?url=';
    } else if (hostname === 'www.instagram.com') {
      return 'https://api.instagram.com/oembed/?url=';
    } else if (hostname === 'twitter.com') {
      return 'https://publish.twitter.com/oembed?url=';
    } else if (hostname === 'vimeo.com') {
      return 'https://vimeo.com/api/oembed.json?url=';
    } else if (hostname === 'www.flickr.com' || hostname === 'flickr.com') {
      return 'http://www.flickr.com/services/oembed/?url=';
    } else {
      return undefined;
    }
  }
}
