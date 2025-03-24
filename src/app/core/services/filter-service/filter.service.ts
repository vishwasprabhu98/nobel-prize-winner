import { Injectable, signal } from '@angular/core';
import { NobelPrizeListFilter } from '../../models/filter.model';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  filterSignal = signal<NobelPrizeListFilter>({
    limit: null,
    nobelPrizeYear: new Date().getFullYear(),
    yearTo: null,
    nobelPrizeCategory: null
  })

  constructor() { }

  setNobelListFilter(data: NobelPrizeListFilter) {
    this.filterSignal.set(data)
  }
}
