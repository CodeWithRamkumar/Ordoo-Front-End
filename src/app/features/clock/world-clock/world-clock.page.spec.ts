import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldClockPage } from './world-clock.page';

describe('WorldClockPage', () => {
  let component: WorldClockPage;
  let fixture: ComponentFixture<WorldClockPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WorldClockPage]
    });
    fixture = TestBed.createComponent(WorldClockPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});