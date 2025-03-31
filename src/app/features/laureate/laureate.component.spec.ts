import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaureateComponent } from './laureate.component';

describe('LaureateComponent', () => {
  let component: LaureateComponent;
  let fixture: ComponentFixture<LaureateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaureateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaureateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
