import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NobelPrizeFilterComponent } from './filter.component';

describe('NobelPrizeFilterComponent', () => {
  let component: NobelPrizeFilterComponent;
  let fixture: ComponentFixture<NobelPrizeFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NobelPrizeFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NobelPrizeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
