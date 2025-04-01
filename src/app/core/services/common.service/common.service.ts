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

  openSnackBar(message: string, action = '') {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  /**
   * Removes the properties of Object having null value 
   * @param object Object with or without null values
   * @returns Object without null value
   */
  removeEmptyValues<T>(object: T) {
    const returnObject: Partial<T> = {}
    const keys = object && Object.keys(object)?.length ? Object.keys(object) : []
    keys.forEach((key: string) => {
      const keyOfT = key as keyof T
      if (object[keyOfT]) {
        returnObject[keyOfT] = object[keyOfT]
      }
    })
    return returnObject as Record<string, string | number | boolean | readonly (string | number | boolean)[]>
  }

  /**
   * Sets the Back button icon visiblity
   * @param showBackButton show/hide back button in header
   * @param route navigation route for back button click
   */
  setBackButtonRoute(showBackButton: boolean, route?: string) {
    this.showBackButton.set(showBackButton)
    if (!showBackButton) {
      this.backButtonRoute.set(null)
    } else {
      this.backButtonRoute.set(route ?? '')
    }
  }

  navigateBack() {
    this.router.navigateByUrl(this.backButtonRoute() ?? '')
  }

}