import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NobelWinnersListComponent } from './nobel-winners-list.component';

describe('NobelWinnersListComponent', () => {
  let component: NobelWinnersListComponent;
  let fixture: ComponentFixture<NobelWinnersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NobelWinnersListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NobelWinnersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
