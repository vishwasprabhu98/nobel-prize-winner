import { inject, Injectable } from '@angular/core';
import { URL } from '../../constants/urls';
import { NobelPrizeListFilter } from '../../models/filter.model';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../common.service/common.service';

@Injectable({
  providedIn: 'root'
})
export class NobelWinnersService {

  httpClient = inject(HttpClient)
  commonService = inject(CommonService)

  fetchNobelWinnersList(filterData: NobelPrizeListFilter) {
    return this.httpClient.get(environment.baseUrl + URL.NOBEL_PRIZE, {
      params: this.commonService.removeEmptyValues(filterData)
    })
  }
}
