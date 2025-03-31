import { inject, Injectable } from '@angular/core';
import { URL } from '../../constants/urls';
import { NobelPrizeListFilterPayload } from '../../models/filter.model';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../common.service/common.service';
import { NobelPrizeList } from '../../models/nobel-prize.model';
import { NobelWinner } from '../../models/nobel-winner.model';
import { CacheService } from '../cache-service/cache.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NobelWinnersService {

  httpClient = inject(HttpClient)
  commonService = inject(CommonService)
  cacheService = inject(CacheService)

  fetchNobelWinnersList(filterData: NobelPrizeListFilterPayload) {
    const query = JSON.stringify(filterData)

    if (this.cacheService.hasQueryDataForWinnerList(query)) {
      return new Observable<NobelPrizeList | null>(observer => {
        observer.next(this.cacheService.getQueryDataForWinnerList(query) ?? null)
        observer.complete()
      })
    }

    return this.httpClient.get<NobelPrizeList>(
      environment.baseUrl + URL.NOBEL_PRIZE, 
      {
        params: this.commonService.removeEmptyValues(filterData)
      }
    ).pipe(
      tap(res => {
        this.cacheService.setQueryDataForWinnerList(query, res)
      })
    )
  }

  fetchNobelWinnerInfoById(id: string) {
    return this.httpClient.get<NobelWinner[]>(
      environment.baseUrl + URL.LAURATES_BY_ID.replace('{id}', id)
    )
  }
}
