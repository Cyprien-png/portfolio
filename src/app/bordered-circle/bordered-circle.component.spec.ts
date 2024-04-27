import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorderedCircleComponent } from './bordered-circle.component';

describe('BorderedCircleComponent', () => {
  let component: BorderedCircleComponent;
  let fixture: ComponentFixture<BorderedCircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorderedCircleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BorderedCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
