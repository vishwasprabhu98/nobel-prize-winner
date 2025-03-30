import { Component } from '@angular/core';
import { NobelPrizeFilterComponent } from "./components/nobel-prize-filter/filter.component";
import { NobelPrizeListFilter } from '../../core/models/filter.model';

@Component({
  selector: 'app-nobel-winners-list',
  imports: [NobelPrizeFilterComponent],
  templateUrl: './nobel-winners-list.component.html',
  styleUrl: './nobel-winners-list.component.scss'
})
export class NobelWinnersListComponent {

  applyFilter(params: NobelPrizeListFilter) {
    console.log(params)
  }
}
