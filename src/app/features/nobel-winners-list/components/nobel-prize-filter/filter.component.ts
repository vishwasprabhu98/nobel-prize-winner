import { Component, computed, effect, EventEmitter, inject, Output, Signal, WritableSignal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon'
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FilterService } from '../../../../core/services/filter-service/filter.service';
import { NobelPrizeListFilter } from '../../../../core/models/filter.model';
import {
  MatDialog,
} from '@angular/material/dialog';
import { FilterFormComponent } from '../filter-form/filter-form.component';
import { default as _rollupMoment, Moment } from 'moment';
import * as _moment from 'moment';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_YEAR_ADAPTER } from '../../../../core/constants/year-adapter-format';
import { FILTER_KEYS, FILTER_NAMES } from '../../../../core/constants/filterKeys';
import { ALL_CATEGORIES } from '../../../../core/enums/categories';
import { CommonService } from '../../../../core/services/common.service/common.service';
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
    provideMomentDateAdapter(MAT_YEAR_ADAPTER)
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class NobelPrizeFilterComponent {

  readonly date = new FormControl(moment());
  readonly dialog = inject(MatDialog);
  readonly maxDate = new Date()
  readonly minDate = new Date('01-01-1901');
  readonly allCategoryValues = ALL_CATEGORIES.reduce(
    (accumulater: Record<string, string>, item) => {
      accumulater[item.value] = item.name
      return accumulater
    }, {}
  )

  @Output()
  applyFilter = new EventEmitter<NobelPrizeListFilter>()

  showFilterCrumbs = false
  searchFilter!: WritableSignal<NobelPrizeListFilter>

  constructor(
    private filterService: FilterService,
    private commonService: CommonService
  ) {
    effect(() => {
      const momentDate = moment(`01/01/${filterService.filterSignal().nobelPrizeYear}`, 'DD/MM/YYYY')
      this.date.setValue(momentDate)
      this.searchFilter = filterService.filterSignal
    })
  }

  openAdvancedFilter() {
    const dialogRef = this.dialog.open(FilterFormComponent, {
      minWidth: '300px',
      data: {
        ...this.searchFilter()
      }
    })

    dialogRef.afterClosed().subscribe(
      (data?: NobelPrizeListFilter) => {
        if (data) {
          this.showFilterCrumbs = false
          if (data?.yearTo || data?.nobelPrizeCategory) {
            this.showFilterCrumbs = true
          }
          this.filterService.setNobelListFilter(data)
        }
      }
    )
  }

  setYear(normalizeYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value ?? moment();
    ctrlValue.year(normalizeYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
    this.filterService.setNobelListFilter({
      ...this.filterService.filterSignal(),
      nobelPrizeYear: normalizeYear.year()
    })
    this.applyFilter.emit()
  }

  removeFilter(key: string) {
    if (key === FILTER_KEYS.NOBEL_PRIZE_YEAR) {
      this.commonService.openSnackBar('Cannot Delete From Year Filter')
      return
    }

    const filterData = this.filterService.filterSignal()
    filterData[key as keyof NobelPrizeListFilter] = null
    this.filterService.setNobelListFilter({
      ...filterData,
    })
    this.toggleFilterView(filterData)
  }

  toggleFilterView(filterData: NobelPrizeListFilter) {
    let filterCount = 0
    Object.keys(filterData).forEach(key => {
      if (filterData[key as keyof NobelPrizeListFilter]) {
        filterCount++
      }
    })
    if (filterCount === 1) {
      this.showFilterCrumbs = false
    }
  }

  getPropertyValue(key: string) {
    const filterValue = this.searchFilter()[key as keyof NobelPrizeListFilter]
    if (key === 'nobelPrizeCategory' && filterValue) {
      return this.allCategoryValues[filterValue]
    }
    return filterValue || ''
  }

  getKeyValue(key: string) {
    return FILTER_NAMES[key]
  }

  get searchKeys() {
    if (this.searchFilter()) {
      return Object.keys(this.searchFilter())
    }
    return []
  }
}
