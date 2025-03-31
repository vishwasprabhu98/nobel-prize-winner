import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NobelWinnerInfoLoaderComponent } from './nobel-winner-info-loader.component';

describe('NobelWinnerInfoLoaderComponent', () => {
  let component: NobelWinnerInfoLoaderComponent;
  let fixture: ComponentFixture<NobelWinnerInfoLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NobelWinnerInfoLoaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NobelWinnerInfoLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
