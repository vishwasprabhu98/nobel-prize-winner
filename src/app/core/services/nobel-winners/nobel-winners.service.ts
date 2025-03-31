import { inject, Injectable } from '@angular/core';
import { URL } from '../../constants/urls';
import { NobelPrizeListFilterPayload } from '../../models/filter.model';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../common.service/common.service';
import { NobelPrizeList } from '../../models/nobel-prize.model';
import { NobelWinner } from '../../models/nobel-winner.model';

@Injectable({
  providedIn: 'root'
})
export class NobelWinnersService {

  httpClient = inject(HttpClient)
  commonService = inject(CommonService)

  fetchNobelWinnersList(filterData: NobelPrizeListFilterPayload) {
    return this.httpClient.get<NobelPrizeList>(
      environment.baseUrl + URL.NOBEL_PRIZE, 
      {
        params: this.commonService.removeEmptyValues(filterData)
      }
    )
  }

  fetchNobelWinnerInfoById(id: string) {
    return this.httpClient.get<NobelWinner[]>(
      environment.baseUrl + URL.LAURATES_BY_ID.replace('{id}', id)
    )
  }
}
