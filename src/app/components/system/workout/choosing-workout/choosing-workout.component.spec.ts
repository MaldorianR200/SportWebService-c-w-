import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosingWorkoutComponent } from './choosing-workout.component';

describe('ChoosingWorkoutComponent', () => {
  let component: ChoosingWorkoutComponent;
  let fixture: ComponentFixture<ChoosingWorkoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChoosingWorkoutComponent]
    });
    fixture = TestBed.createComponent(ChoosingWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
