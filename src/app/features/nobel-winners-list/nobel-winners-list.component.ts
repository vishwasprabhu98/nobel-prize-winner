import { Component, inject } from '@angular/core';
import { NobelPrizeFilterComponent } from "./components/nobel-prize-filter/filter.component";
import { NobelPrizeListFilter } from '../../core/models/filter.model';
import {MatPaginatorModule} from '@angular/material/paginator';
import { NobelWinnersService } from '../../core/services/nobel-winners/nobel-winners.service';
import { FilterService } from '../../core/services/filter-service/filter.service';

@Component({
  selector: 'app-nobel-winners-list',
  imports: [NobelPrizeFilterComponent, MatPaginatorModule],
  templateUrl: './nobel-winners-list.component.html',
  styleUrl: './nobel-winners-list.component.scss'
})
export class NobelWinnersListComponent {

  nobelWinnersService = inject(NobelWinnersService)
  filterService = inject(FilterService)

  applyFilter() {
    this.nobelWinnersService.fetchNobelWinnersList(
      this.filterService.filterSignal()
    ).subscribe({
      next: response => {
        console.log(response)
      }
    })
  }
}
