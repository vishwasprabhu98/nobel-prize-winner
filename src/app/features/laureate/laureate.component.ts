import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NobelWinnersService } from '../../core/services/nobel-winners/nobel-winners.service';
import { NobelWinner } from '../../core/models/nobel-winner.model';
import { DatePipe } from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NobelWinnerInfoLoaderComponent } from '../../shared/components/loading-screen/nobel-winner-info-loader/nobel-winner-info-loader.component';
import { CommonService } from '../../core/services/common.service/common.service';

@Component({
  selector: 'app-laureate',
  imports: [DatePipe, MatExpansionModule, MatIconModule, MatButtonModule, NobelWinnerInfoLoaderComponent],
  templateUrl: './laureate.component.html',
  styleUrl: './laureate.component.scss'
})
export class LaureateComponent implements OnInit {

  EXTERNAL_LINK = 'external'

  activatedRouter = inject(ActivatedRoute)
  router = inject(Router)
  nobelWinnersService = inject(NobelWinnersService)
  commonService = inject(CommonService)

  winnerInformation: NobelWinner | null = null
  isLoading = false

  ngOnInit(): void {
    const laureateId = this.activatedRouter.snapshot.params?.['id'] ?? null
    if (!laureateId) {
      this.router.navigateByUrl('prize-list')
    } else {
      this.fetchLaureateInfo(`${laureateId}`)
    }
    this.commonService.setBackButtonRoute(true, 'prize-list')
  }

  fetchLaureateInfo(id: string) {
    this.isLoading = true
    this.nobelWinnersService.fetchNobelWinnerInfoById(id).subscribe({
      next: (response) => {
        this.isLoading = false
        if (response[0]?.id) {
          this.winnerInformation = response[0]
        } else {
          this.winnerInformation = null
        }
      },
      error: () => {
        this.winnerInformation = null
        this.isLoading = false
      }
    })
  }
}
