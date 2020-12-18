import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ram2Component } from './ram2.component';

describe('Ram2Component', () => {
  let component: Ram2Component;
  let fixture: ComponentFixture<Ram2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Ram2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Ram2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
