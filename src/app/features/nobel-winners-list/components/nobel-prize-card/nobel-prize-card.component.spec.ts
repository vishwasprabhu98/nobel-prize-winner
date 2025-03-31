import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NobelPrizeCardComponent } from './nobel-prize-card.component';

describe('NobelPrizeCardComponent', () => {
  let component: NobelPrizeCardComponent;
  let fixture: ComponentFixture<NobelPrizeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NobelPrizeCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NobelPrizeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
