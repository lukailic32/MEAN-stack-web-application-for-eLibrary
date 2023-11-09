import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PzkComponent } from './pzk.component';

describe('PzkComponent', () => {
  let component: PzkComponent;
  let fixture: ComponentFixture<PzkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PzkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PzkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
