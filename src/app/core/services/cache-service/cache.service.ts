import { Injectable } from '@angular/core';
import moment, { Moment } from 'moment'
import { NobelPrizeList } from '../../models/nobel-prize.model';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  nobelWinnerListCache = new Map<string, { time: Moment, data: NobelPrizeList }>()
  cacheSetCounter = 0

  /**
   * Checks if the valid data is available in cache for given query
   * @param query key for the cache
   * @returns boolean
   */
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

  /**
   * Return the data from the cache
   * @param query key
   * @returns cached data
   */
  getQueryDataForWinnerList(query: string) {
    return this.nobelWinnerListCache.get(query)?.data
  }

  /**
   * Add the response to the cache file
   * @param query key
   * @param data data to be stored in the cache
   * Moment is added to data.time to delete the cached value after `x` minutes
   */
  setQueryDataForWinnerList(query: string, data: NobelPrizeList) {
    this.cacheSetCounter++
    this.nobelWinnerListCache.set(query, { time: moment(), data })
    
    // will go through all elements and remove older cache saves 
    if (this.cacheSetCounter === 10) {
      for(const key of this.nobelWinnerListCache.keys()) {
        if (this.isOlderThanGivenMinutes(10, this.nobelWinnerListCache.get(key)?.time)) {
          this.nobelWinnerListCache.delete(key)
        }
      }
      this.cacheSetCounter = 0
    }
  }
  
  isOlderThanGivenMinutes(minutes: number, time?: Moment) {
    if (time) {
      return moment().diff(time, 'minutes') > minutes - 1
    }
    return true
  }
}
