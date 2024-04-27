import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagneticCircleComponent } from './magnetic-circle.component';

describe('MagneticCircleComponent', () => {
  let component: MagneticCircleComponent;
  let fixture: ComponentFixture<MagneticCircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagneticCircleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MagneticCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
