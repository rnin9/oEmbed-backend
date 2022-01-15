import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { lastValueFrom, map } from 'rxjs';
import { urlDto } from './dto/url.dto';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  /* @brief Main Logic which is Getting oEmbed data
   * @date 22/01/15
   * @return data (Promise<AxiosResponse>) : data which is derived from oEmbed api
   * @param urlDTO : url query element (urlDTO which is defined in /src/dto/url.dto.ts)
   */
  async getData(urlData: urlDto): Promise<AxiosResponse> {
    const url = new URL(urlData.url);
    //make url process, use two async function parallelly with promise.all()
    const api = await Promise.all([
      //selecting api by url's hostname
      this.selectApi(url.hostname).catch((err) => {
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

  /* @brief 'url with query' making Logic
   * @date 22/01/15
   * @return url(Promise<string>) : completed url which is made by urlDTO
   * @param urlDTO : url query element (urlDTO which is defined in /src/dto/url.dto.ts)
   */
  async makeQuery(url: urlDto): Promise<string> {
    const urlSchema = new URL(url.url);
    const params = new URLSearchParams(urlSchema.search);
    //append all parameters which is in urlDto element to url
    Object.keys(url).map((query) => {
      params.append(query, url[query].toString());
    });
    return urlSchema.toString() + '&' + params.toString();
  }

  /* @brief Logic which is selecting api by hostname
   * @date 22/01/15
   * @return specific url(Promise<string>) : get specific url which is fit with hostname
   * @param hostname : hostname which is requested by client(consumer)
   */
  async selectApi(hostname: string): Promise<string> {
    //selecting api url logic
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
