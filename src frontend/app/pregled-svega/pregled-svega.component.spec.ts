import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledSvegaComponent } from './pregled-svega.component';

describe('PregledSvegaComponent', () => {
  let component: PregledSvegaComponent;
  let fixture: ComponentFixture<PregledSvegaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregledSvegaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PregledSvegaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
