import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuscleMassComponent } from './muscle-mass.component';

describe('MuscleMassComponent', () => {
  let component: MuscleMassComponent;
  let fixture: ComponentFixture<MuscleMassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MuscleMassComponent]
    });
    fixture = TestBed.createComponent(MuscleMassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
