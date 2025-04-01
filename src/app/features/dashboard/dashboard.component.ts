import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CommonService } from '../../core/services/common.service/common.service';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-dashboard',
  imports: [MatButtonModule, MatExpansionModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  router = inject(Router)
  commonService = inject(CommonService)

  questions = [
    {
      question: 'Categories of the Nobel Prize',
      answer1: `The Nobel Prizes are awarded in six categories:`,
      answer2: [
        'Peace – For promoting peace and resolving conflicts.',
        'Literature – For outstanding literary work, including novels, poems, or essays.',
        'Physics – For major discoveries or advancements in the field of physics',
        'Chemistry – For significant contributions to the field of chemistry',
        'Physiology or Medicine – For discoveries in medical sciences that benefit human health',
        'Economic Sciences (added in 1968) – For exceptional work in economics, officially called the Sveriges Riksbank Prize in Economic Sciences in Memory of Alfred Nobel',
      ]
    },
    {
      question: 'Who Established the Nobel Prize?',
      answer1: 'Alfred Nobel, a Swedish chemist and the inventor of dynamite, established the Nobel Prize. In his will, he specified that his fortune should be used to create prizes for those who confer the greatest benefit to humanity in the aforementioned categories.',
      answer2: []
    },
    {
      question: 'How are Nobel Laureates Chosen?',
      answer1: 'Nobel Prize winners, known as "laureates," are selected by various committees and organizations specific to each category:',
      answer2: [
        'The Royal Swedish Academy of Sciences selects laureates for Physics, Chemistry, and Economic Sciences.',
        'The Karolinska Institute selects the laureate for Physiology or Medicine.',
        'The Norwegian Nobel Committee selects the laureate for Peace.',
        'The Swedish Academy selects the laureate for Literature.'
      ]
    }
  ]

  constructor() {
    this.commonService.setBackButtonRoute(false)
  }

  showWinnersList() {
    this.router.navigateByUrl('/prize-list')
  }
}
