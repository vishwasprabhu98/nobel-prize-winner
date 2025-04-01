import { Component, inject } from '@angular/core';
import { NobelPrizeFilterComponent } from "./components/nobel-prize-filter/filter.component";
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { NobelWinnersService } from '../../core/services/nobel-winners/nobel-winners.service';
import { FilterService } from '../../core/services/filter-service/filter.service';
import { NobelPrizeCardComponent } from './components/nobel-prize-card/nobel-prize-card.component';
import { NobelPrize, NobelPrizeList } from '../../core/models/nobel-prize.model';
import { NobelPrizeCardLoaderComponent } from '../../shared/components/loading-screen/nobel-prize-card-loader/nobel-prize-card-loader.component';
import { CommonService } from '../../core/services/common.service/common.service';

@Component({
  selector: 'app-nobel-winners-list',
  imports: [NobelPrizeFilterComponent, NobelPrizeCardComponent, MatPaginatorModule, NobelPrizeCardLoaderComponent],
  templateUrl: './nobel-winners-list.component.html',
  styleUrl: './nobel-winners-list.component.scss'
})
export class NobelWinnersListComponent {

  nobelWinnersService = inject(NobelWinnersService)
  filterService = inject(FilterService)
  commonService = inject(CommonService)

  prizeWinnersList: NobelPrize[] | null = null
  isLoading = false

  pageIndex = 0
  pageSize = 15
  totalResultsLength = 0
  pageSizeOptions = [15, 25, 50]

  constructor() {
    // set the previous page route
    this.commonService.setBackButtonRoute(true, 'dashboard')
  }

  /**
   * Function to fetch the nobel prize winners list and
   * sets the list array with api data
   * @param resetPageIndex boolean, defines the page number
   */
  applyFilter(resetPageIndex = true) {
    if (resetPageIndex) {
      this.pageIndex = 0
    }

    this.isLoading = true
    const queryParams = {
      ...this.filterService.filterSignal(),
      limit: this.pageSize,
      offset: this.pageSize * this.pageIndex
    }
    this.nobelWinnersService.fetchNobelWinnersList(queryParams)
    .subscribe({
      next: (response: NobelPrizeList|null) => {
        this.isLoading = false
        if (response) {
          this.prizeWinnersList = response.nobelPrizes
          this.totalResultsLength = response.meta.count
        } else {
          this.resetWinnersList()
        }
      },
      error: (e) => {
        if (e?.error?.message) {
          this.commonService.openSnackBar(e.error?.message)
        }
        this.isLoading = false
        this.resetWinnersList()
      }
    })
  }

  resetWinnersList() {
    this.prizeWinnersList = null
    this.totalResultsLength = 0
  }

  /**
   * Function to handle the pagination event
   * @param event PageEvent
   */
  onPaginate(event: PageEvent) {
    this.pageIndex = event.pageIndex
    this.pageSize = event.pageSize
    this.applyFilter(false)
  }
}
