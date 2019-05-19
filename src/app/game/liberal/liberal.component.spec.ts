import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiberalComponent } from './liberal.component';

describe('LiberalComponent', () => {
  let component: LiberalComponent;
  let fixture: ComponentFixture<LiberalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiberalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiberalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
