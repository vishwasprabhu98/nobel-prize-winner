import { inject, Injectable } from "@angular/core";
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action?: string) {
    this._snackBar.open(message, '', {
      duration: 3000
    });
  }

  removeEmptyValues(object: any) {
    const recordObject: Record<string, string | number | boolean | readonly (string | number | boolean)[]> = {}
    const keys = object && Object.keys(object)?.length ? Object.keys(object) : []
    keys.forEach((key: string) => {
      if (!!object[key]) {
        recordObject[key] = object[key]
      }
    })
    return recordObject
  }

}