import { Component, effect, EventEmitter, inject, Output, WritableSignal } from '@angular/core';
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
      this.applyFilter.emit()
      this.toggleFilterView({
        ...this.searchFilter()
      })
    })
  }

  openAdvancedFilter() {
    const dialogRef = this.dialog.open(FilterFormComponent, {
      minWidth: '350px',
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
  }

  removeFilter(filterKey: string) {
    const key = filterKey as keyof NobelPrizeListFilter
    const filterData = this.filterService.filterSignal()

    if (key === FILTER_KEYS.NOBEL_PRIZE_YEAR) {
      // set to 1901 because it is default starting date
      if (filterData[key] === 1901) {
        this.commonService.openSnackBar('Default From Year is 1901')
        return
      }
      filterData.nobelPrizeYear = new Date('01-01-1901').getFullYear()
    } else {
      filterData[key] = null
    }

    this.filterService.setNobelListFilter({
      ...filterData,
    })
    this.toggleFilterView(filterData)
  }

  toggleFilterView(filterData: NobelPrizeListFilter) {
    let filterCount = 0
    this.showFilterCrumbs = true
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
    if (key === FILTER_KEYS.NOBEL_PRIZE_CATEGORY && filterValue) {
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
