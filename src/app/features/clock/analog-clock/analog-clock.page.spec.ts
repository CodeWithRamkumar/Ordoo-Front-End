import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalogClockPage } from './analog-clock.page';

describe('AnalogClockPage', () => {
  let component: AnalogClockPage;
  let fixture: ComponentFixture<AnalogClockPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalogClockPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});