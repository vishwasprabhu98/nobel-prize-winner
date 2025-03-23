import { Component } from '@angular/core';
import { FilterComponent } from "../../shared/components/filter/filter.component";

@Component({
  selector: 'app-nobel-winners-list',
  imports: [FilterComponent],
  templateUrl: './nobel-winners-list.component.html',
  styleUrl: './nobel-winners-list.component.scss'
})
export class NobelWinnersListComponent {

}
