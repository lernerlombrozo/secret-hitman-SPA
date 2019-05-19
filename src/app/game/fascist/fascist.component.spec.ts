import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FascistComponent } from './fascist.component';

describe('FascistComponent', () => {
  let component: FascistComponent;
  let fixture: ComponentFixture<FascistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FascistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FascistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
