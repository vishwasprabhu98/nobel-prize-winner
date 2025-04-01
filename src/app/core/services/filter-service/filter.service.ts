import { Injectable, signal } from '@angular/core';
import { NobelPrizeListFilter } from '../../models/filter.model';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  filterSignal = signal<NobelPrizeListFilter>({
    nobelPrizeYear: new Date().getFullYear() - 1,
    yearTo: null,
    nobelPrizeCategory: null
  })

  constructor() { }

  setNobelListFilter(data: NobelPrizeListFilter) {
    this.filterSignal.set(data)
  }
}
