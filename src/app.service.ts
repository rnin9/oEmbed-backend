import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { catchError, lastValueFrom, map } from 'rxjs';
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
      this.selectApi(url.hostname, url.pathname).catch((err) => {
        throw new HttpException(err.response, err.status);
      }),
      //make query url with parameters made by urlDto elements
      this.makeQuery(urlData).catch((err) => {
        throw new HttpException(err.response, err.status);
      }),
    ]).then((subUrls) => subUrls.join(''));
    //using Rxjs to get Data when api URL Ready.
    const resp = this.httpService.get(api).pipe(
      map((res) => res.data),
      catchError((err) => {
        throw new HttpException(
          'Error on Getting Data from oEmbed Api (check Query Parameters)',
          err.response.status,
        );
      }),
    );
    // subscribe and await until operation finished, and convert to promise
    const data = await lastValueFrom(resp);
    return data;
  }

  /* @brief 'url with query' making Logic
   * @date 22/01/14
   * @return url(Promise<string>) : completed url which is made by urlDTO
   * @param urlDTO : url query element (urlDTO which is defined in /src/dto/url.dto.ts)
   */
  async makeQuery(url: urlDto): Promise<string> {
    const urlScheme = new URL(url.url);
    const params = new URLSearchParams(urlScheme.search);
    //append all parameters which is in urlDto element to url
    Object.keys(url).map((query) => {
      if (query !== 'url') {
        params.append(query, url[query].toString());
      }
    });
    return urlScheme.toString() + '&' + params.toString();
  }

  /* @brief Logic which is selecting api by hostname
   * @date 22/01/14
   * @return specific url(Promise<string>) : get specific url which is fit with hostname
   * @param hostname, pathname : hostname & hostname which is requested by client(consumer)
   * @error statusCode 404(not found) : not appropriate url scheme Depths
   *        statusCode 400(bad request) : not appropriate url api (not supported)
   */
  async selectApi(hostname: string, pathname: string): Promise<string> {
    //get consumer's urlScheme depths to check valid URL
    const depths = this.checkDepths(pathname);
    const apis = {
      'youtube.com': 'https://www.youtube.com/oembed?url=',
      'instagram.com': 'https://api.instagram.com/oembed/?url=',
      'twitter.com': 'https://publish.twitter.com/oembed?url=',
      'vimeo.com': 'https://vimeo.com/api/oembed.json?url=',
      'flickr.com': 'http://www.flickr.com/services/oembed/?url=',
      'Not-match': 'end', // to control loop when domain does not match with apis
    };
    //check all elements of 'apis'object
    for (const [domain, api] of Object.entries(apis)) {
      //if domain not matches with any elements of 'apis' object, error
      if (domain === 'Not-match') {
        throw new HttpException(
          'not Valid oEmbed Api URL',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (hostname.match(domain)) {
        //if domain matches with 'apis' key, checking depths
        if (this.validDepths(depths, hostname.match(domain)[0])) {
          return api;
        } else {
          throw new HttpException(
            'not Valid url Scheme Depths',
            HttpStatus.NOT_FOUND,
          );
        }
      }
    }
  }

  /* @brief Logic which is check url scheme pathname depths (checking valid scheme)
   * @date 22/01/15
   * @return number of depths (number) : get url pathname depths
   * @param pathname : pathname which is requested by client(consumer)
   */
  checkDepths(pathname: string): number {
    if (pathname === '/') {
      return 0;
    } else {
      return pathname.match(/\/.+?/g).length;
    }
  }

  /* @brief Logic which is check url scheme pathname depths (checking valid scheme)
   * @date 22/01/15
   * @return number of depths (number)  : get url pathname depths
   * @param depths : number of depths which is requested by client(consumer)
            domain : domain which is requested by client(consumer's urlScheme)
  */
  validDepths(depths: number, domain: string): boolean {
    const apiDepths = {
      'youtube.com': 1,
      'instagram.com': 2,
      'twitter.com': 1,
      'vimeo.com': 1,
      'flickr.com': 2,
    };
    if (depths < apiDepths[domain]) return false;
    else return true;
  }
}
