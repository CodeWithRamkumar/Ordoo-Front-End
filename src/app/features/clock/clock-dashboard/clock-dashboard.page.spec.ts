import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClockDashboardPage } from './clock-dashboard.page';

describe('ClockDashboardPage', () => {
  let component: ClockDashboardPage;
  let fixture: ComponentFixture<ClockDashboardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClockDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});