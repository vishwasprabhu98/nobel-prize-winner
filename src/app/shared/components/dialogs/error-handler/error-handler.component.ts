import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-handler',
  imports: [
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './error-handler.component.html',
  styleUrl: './error-handler.component.scss'
})
export class ErrorHandlerComponent {

  data = inject(MAT_DIALOG_DATA);
  router = inject(Router)

  constructor(
    private dialogRef: MatDialogRef<ErrorHandlerComponent>
  ) { }

  closeDialog() {
    this.dialogRef.close()
    this.router.navigateByUrl(this.data?.redirectUrl ?? this.router.url)
  }

}
