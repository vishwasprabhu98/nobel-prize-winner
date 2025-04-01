import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CommonService } from '../../core/services/common.service/common.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { QUESTIONS } from '../../core/constants/questions';

@Component({
  selector: 'app-dashboard',
  imports: [MatButtonModule, MatExpansionModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  router = inject(Router)
  commonService = inject(CommonService)

  questions = QUESTIONS

  constructor() {
    this.commonService.setBackButtonRoute(false)
  }

  showWinnersList() {
    this.router.navigateByUrl('/prize-list')
  }
}
