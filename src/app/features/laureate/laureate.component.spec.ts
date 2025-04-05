import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaureateComponent } from './laureate.component';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { provideHttpClient } from '@angular/common/http';

describe('LaureateComponent', () => {
  let component: LaureateComponent;
  let fixture: ComponentFixture<LaureateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaureateComponent],
      providers: [
        provideHttpClient(),
        provideRouter(routes)
      ]
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
