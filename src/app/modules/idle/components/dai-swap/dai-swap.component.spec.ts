import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaiSwapComponent } from './dai-swap.component';

describe('DaiSwapComponent', () => {
  let component: DaiSwapComponent;
  let fixture: ComponentFixture<DaiSwapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DaiSwapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DaiSwapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
