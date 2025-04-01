import { inject, Injectable, signal } from "@angular/core";
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private _snackBar = inject(MatSnackBar);
  private router = inject(Router)
  
  showBackButton = signal(false)
  backButtonRoute = signal<string|null>('')

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

  setBackButtonRoute(showBackButton: boolean, route?: string) {
    this.showBackButton.set(showBackButton)
    if (!showBackButton) {
      this.backButtonRoute.set(null)
    } else {
      this.backButtonRoute.set(route ?? '')
    }
    console.log('%csrc/app/core/services/common.service/common.service.ts:43 this.backButtonRoute()', 'color: #007acc;', this.backButtonRoute());

  }

  navigateBack() {
    console.log('%csrc/app/core/services/common.service/common.service.ts:43 this.backButtonRoute()', 'color: #007acc;', this.backButtonRoute());
    this.router.navigateByUrl(this.backButtonRoute() ?? '')
  }

}