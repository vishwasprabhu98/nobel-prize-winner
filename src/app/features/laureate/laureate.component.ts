import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-laureate',
  imports: [],
  templateUrl: './laureate.component.html',
  styleUrl: './laureate.component.scss'
})
export class LaureateComponent implements OnInit {

  activatedRouter = inject(ActivatedRoute)
  router = inject(Router)

  ngOnInit(): void {
    const laureateId = this.activatedRouter.snapshot.params?.['id'] ?? null
    if (!laureateId) {
      this.router.navigateByUrl('prize-list')
    }
  }

  goBack() {
    this.router.navigateByUrl('prize-list')
  }
}
