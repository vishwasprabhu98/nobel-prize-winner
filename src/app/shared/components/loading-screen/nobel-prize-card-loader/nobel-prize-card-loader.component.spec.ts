import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NobelPrizeCardLoaderComponent } from './nobel-prize-card-loader.component';

describe('NobelPrizeCardLoaderComponent', () => {
  let component: NobelPrizeCardLoaderComponent;
  let fixture: ComponentFixture<NobelPrizeCardLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NobelPrizeCardLoaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NobelPrizeCardLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
