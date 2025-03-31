import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { Laureate, NobelPrize } from '../../../../core/models/nobel-prize.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nobel-prize-card',
  imports: [DatePipe, RouterModule],
  templateUrl: './nobel-prize-card.component.html',
  styleUrl: './nobel-prize-card.component.scss'
})
export class NobelPrizeCardComponent {
  prize = input<NobelPrize>()

  getName(laureate: Laureate) {
    if (laureate?.['orgName']) {
      return laureate['orgName'].en
    } else {
      return laureate['fullName']?.en ?? ''
    }
  }
}
