import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NobelWinnersListComponent } from './nobel-winners-list.component';
import { provideHttpClient } from '@angular/common/http';
import { winnerMockData } from '../../../../test-data/winners-mock-data';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { NobelWinnersService } from '../../core/services/nobel-winners/nobel-winners.service';
import { of } from 'rxjs';

describe('NobelWinnersListComponent', () => {
  let component: NobelWinnersListComponent;
  let fixture: ComponentFixture<NobelWinnersListComponent>;
  let nobelListService: NobelWinnersService;
  let fetchNobelWinnersListSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NobelWinnersListComponent],
      providers: [provideHttpClient(), provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(NobelWinnersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show loader when loading is true', () => {
    const nativeElement = fixture.nativeElement as HTMLElement;
    // change loading value to true
    component.isLoading = true;
    fixture.detectChanges();
    const cardLoaderElements = nativeElement
      .querySelector('.prize-winners')
      ?.getElementsByTagName('app-nobel-prize-card-loader');
    expect(cardLoaderElements).toHaveSize(1);
  });

  it('should not show loader when loading is false', () => {
    const nativeElement = fixture.nativeElement as HTMLElement;
    // change loading value to true
    component.isLoading = false;
    fixture.detectChanges();
    const cardLoaderElements = nativeElement
      .querySelector('.prize-winners')
      ?.getElementsByTagName('app-nobel-prize-card-loader');
    expect(cardLoaderElements).toHaveSize(0);
  });

  it('should show No results found in h3 tag on empty data', () => {
    const nativeElement = fixture.nativeElement as HTMLElement;
    // change loading value to true
    component.prizeWinnersList = [];
    component.isLoading = false;
    fixture.detectChanges();
    const cardLoaderElements = nativeElement
      .querySelector('.prize-winners')
      ?.getElementsByTagName('h3');
    expect(cardLoaderElements).toHaveSize(1);
    if (cardLoaderElements?.length) {
      expect(cardLoaderElements[0]?.innerHTML).toEqual('No Results Found');
    }
  });

  it('should have a back button route set to dashboard', () => {
    fixture.detectChanges();
    expect(component.commonService.backButtonRoute()).toEqual('dashboard');
  });

  it('should render winner card when list is available', () => {
    const nativeElement = fixture.nativeElement as HTMLElement;
    component.isLoading = false;
    component.prizeWinnersList = winnerMockData.nobelPrizes;
    fixture.detectChanges();
    expect(
      nativeElement.getElementsByTagName('app-nobel-prize-card')
    ).toHaveSize(1); // mock data length is 1
  });

  it('should call fetchNobelWinnersList on calling applyFilter method', () => {
    nobelListService = TestBed.inject(NobelWinnersService);
    fetchNobelWinnersListSpy = spyOn(
      nobelListService,
      'fetchNobelWinnersList'
    ).and.returnValue(of(winnerMockData));
    const nativeElement = fixture.nativeElement as HTMLElement;
    fixture.detectChanges()

    component.isLoading = false;
    component.applyFilter(false);
    fixture.detectChanges();
    
    expect(fetchNobelWinnersListSpy).toHaveBeenCalledWith({
      nobelPrizeYear: 2024,
      yearTo: null,
      nobelPrizeCategory: null,
      limit: 15,
      offset: 0,
    });
    fixture.detectChanges();
    expect(
      nativeElement.getElementsByTagName('app-nobel-prize-card')
    ).toHaveSize(1);
  });
});
