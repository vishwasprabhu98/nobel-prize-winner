import { Component, inject } from '@angular/core';
import { NobelPrizeFilterComponent } from "./components/nobel-prize-filter/filter.component";
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { NobelWinnersService } from '../../core/services/nobel-winners/nobel-winners.service';
import { FilterService } from '../../core/services/filter-service/filter.service';
import { NobelPrizeCardComponent } from './components/nobel-prize-card/nobel-prize-card.component';
import { NobelPrize, NobelPrizeList } from '../../core/models/nobel-prize.model';
import { NobelPrizeCardLoaderComponent } from '../../shared/components/loading-screen/nobel-prize-card-loader/nobel-prize-card-loader.component';

@Component({
  selector: 'app-nobel-winners-list',
  imports: [NobelPrizeFilterComponent, NobelPrizeCardComponent, MatPaginatorModule, NobelPrizeCardLoaderComponent],
  templateUrl: './nobel-winners-list.component.html',
  styleUrl: './nobel-winners-list.component.scss'
})
export class NobelWinnersListComponent {

  nobelWinnersService = inject(NobelWinnersService)
  filterService = inject(FilterService)

  prizeWinnersList: Array<NobelPrize> | null = null
  isLoading = false

  pageIndex = 0
  pageSize = 15
  totalResultsLength = 0
  pageSizeOptions = [15, 25, 50]

  applyFilter(resetPageIndex: boolean = true) {
    if (resetPageIndex) {
      this.pageIndex = 0
    }
    this.isLoading = true
    this.nobelWinnersService.fetchNobelWinnersList({
      ...this.filterService.filterSignal(),
      limit: this.pageSize,
      offset: this.pageSize * this.pageIndex
    }).subscribe({
      next: (response: NobelPrizeList) => {
        this.isLoading = false
        this.prizeWinnersList = response.nobelPrizes
        this.totalResultsLength = response.meta.count
      },
      error: (e) => {
        this.isLoading = false
      }
    })
  }

  onPaginate(event: PageEvent) {
    this.pageIndex = event.pageIndex
    this.pageSize = event.pageSize
    this.applyFilter(false)
  }
}
