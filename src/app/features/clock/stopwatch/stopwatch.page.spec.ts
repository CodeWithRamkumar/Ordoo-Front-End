import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StopwatchPage } from './stopwatch.page';

describe('StopwatchPage', () => {
  let component: StopwatchPage;
  let fixture: ComponentFixture<StopwatchPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StopwatchPage]
    });
    fixture = TestBed.createComponent(StopwatchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});