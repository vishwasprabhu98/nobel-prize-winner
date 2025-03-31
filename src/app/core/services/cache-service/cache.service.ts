import { Injectable } from '@angular/core';
import moment, { Moment } from 'moment'
import { NobelPrizeList } from '../../models/nobel-prize.model';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  nobelWinnerListCache = new Map<string, { time: Moment, data: NobelPrizeList }>()

  hasQueryDataForWinnerList(query: string) {
    const hasData = this.nobelWinnerListCache.has(query)
    if (hasData) {
      const data = this.nobelWinnerListCache.get(query)
      if (
        !data?.data ||
        this.isOlderThanGivenMinutes(10, data?.time)
      ) {
        return false
      }
    }
    return hasData
  }

  getQueryDataForWinnerList(query: string) {
    return this.nobelWinnerListCache.get(query)?.data
  }

  setQueryDataForWinnerList(query: string, data: NobelPrizeList) {
    return this.nobelWinnerListCache.set(query, { time: moment(), data })
  }

  isOlderThanGivenMinutes(minutes: number, time?: Moment) {
    if (time) {
      return moment().diff(time, 'minutes') > minutes - 1
    }
    return true
  }
}
