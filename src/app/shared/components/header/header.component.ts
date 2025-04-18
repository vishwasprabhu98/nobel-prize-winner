import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonService } from '../../../core/services/common.service/common.service';

@Component({
  selector: 'app-header',
  imports: [MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  commonService = inject(CommonService)

  /**
   * On clicking Back button navigate to the route
   * set in comment service
   */
  back() {
    this.commonService.navigateBack()
  }
}
