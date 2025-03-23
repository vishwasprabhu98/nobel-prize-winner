import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'app-filter',
  imports: [
    MatIconModule
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {

  showFilterCrumbs = true
  searchFilter: Record<string, string|number> = {
    name: 'ABc',
    from: 2052,
    to: 4003
  }

  constructor() {}

  get searchKeys() {
    return Object.keys(this.searchFilter)
  }

}
