import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ALL_CATEGORIES } from '../../../../core/enums/categories';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { default as _rollupMoment, Moment } from 'moment';
import * as _moment from 'moment';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_YEAR_ADAPTER } from '../../../../core/constants/year-adapter-format';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-filter-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSelectModule,
  ],
  providers: [provideMomentDateAdapter(MAT_YEAR_ADAPTER)],
  templateUrl: './filter-form.component.html',
  styleUrl: './filter-form.component.scss',
})
export class FilterFormComponent implements OnInit {
  readonly categories = ALL_CATEGORIES.map((category) => ({ ...category }));
  readonly currentYear = new Date();
  readonly minDate = new Date('01-01-1901');

  filterForm!: FormGroup;
  data = inject(MAT_DIALOG_DATA);

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<FilterFormComponent>
  ) {
    this.filterForm = formBuilder.group({
      nobelPrizeYear: [
        null,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.min(1901),
          Validators.max(this.currentYear.getFullYear()),
        ],
      ],
      yearTo: [null, [Validators.max(this.currentYear.getFullYear())]],
      nobelPrizeCategory: [null],
    });
  }

  ngOnInit() {
    this.filterForm.patchValue({
      nobelPrizeYear: this.getDateFromYear(this.data.nobelPrizeYear),
      yearTo: this.data.yearTo ? this.getDateFromYear(this.data.yearTo) : null,
      nobelPrizeCategory: this.data.nobelPrizeCategory
    });
  }

  getDateFromYear(year: number) {
    return moment(`01/01/${year}`, 'DD/MM/YYYY')
  }

  setYear(
    normalizeYear: Moment,
    datepicker: MatDatepicker<Moment>,
    controlName: string
  ) {
    const ctrlValue = this.filterForm.get(controlName)?.value ?? moment();
    ctrlValue.year(normalizeYear.year());
    this.filterForm.get(controlName)?.setValue(ctrlValue);
    datepicker.close();
  }

  addFilter() {
    const payload = this.filterForm.getRawValue();
    payload.nobelPrizeYear = payload.nobelPrizeYear?.year() ?? null;
    payload.yearTo = payload.yearTo?.year() ?? null;
    this.dialogRef.close(payload);
  }

  getMinDate() {
    if (this.filterForm.get('nobelPrizeYear')?.value) {
      return new Date(this.filterForm.get('nobelPrizeYear')?.value)
    }
    return this.getDateFromYear(1901)
  }
}
