import { Component, computed, EventEmitter, inject, Output, Signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon'
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import * as _moment from 'moment';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import {default as _rollupMoment, Moment} from 'moment';
import { FilterService } from '../../../../core/services/filter-service/filter.service';
import { NobelPrizeListFilter } from '../../../../core/models/filter.model';
import {
  MatDialog,
} from '@angular/material/dialog';
import { FilterFormComponent } from '../filter-form/filter-form.component';
const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-nobel-prize-filter',
  imports: [
    MatIconModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [
    provideMomentDateAdapter({
      parse: {
        dateInput: 'YYYY',
      },
      display: {
        dateInput: 'YYYY',
        monthYearLabel: 'YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'YYYY',
      },
    })
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class NobelPrizeFilterComponent {

  readonly date = new FormControl(moment());
  readonly dialog = inject(MatDialog);

  @Output()
  applyFilter = new EventEmitter<NobelPrizeListFilter>()

  showFilterCrumbs = false
  searchFilter!: Signal<NobelPrizeListFilter>

  constructor(
    private filterService: FilterService
  ) {
    this.searchFilter = computed(() => filterService.filterSignal())
  }

  openAdvancedFilter() {
    this.dialog.open(FilterFormComponent)
  }

  setYear(normalizeYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value ?? moment();
    ctrlValue.year(normalizeYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
    this.applyFilter.emit({ ...this.searchFilter() })
  }

  getPropertyValue(key: string) {
    return this.searchFilter()[key as keyof NobelPrizeListFilter]
  }

  get searchKeys() {
    if (this.searchFilter()) {
      return Object.keys(this.searchFilter())
    }
    return []
  }
}
