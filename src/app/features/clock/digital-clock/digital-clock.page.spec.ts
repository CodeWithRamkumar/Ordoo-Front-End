import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DigitalClockPage } from './digital-clock.page';

describe('DigitalClockPage', () => {
  let component: DigitalClockPage;
  let fixture: ComponentFixture<DigitalClockPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalClockPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});