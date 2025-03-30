import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  get(
    endpoint: string, 
    params?:  HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>, 
    headers?: HttpHeaders | Record<string, string | string[]>
  ) {
    const url = environment.baseUrl + endpoint
    return this.httpClient.get(
      url,
      {
        params,
        headers
      }
    )
  }
}
