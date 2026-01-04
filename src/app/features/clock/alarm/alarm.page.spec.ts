import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlarmPage } from './alarm.page';

describe('AlarmPage', () => {
  let component: AlarmPage;
  let fixture: ComponentFixture<AlarmPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AlarmPage]
    });
    fixture = TestBed.createComponent(AlarmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});