import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistracijaKnjigeComponent } from './registracija-knjige.component';

describe('RegistracijaKnjigeComponent', () => {
  let component: RegistracijaKnjigeComponent;
  let fixture: ComponentFixture<RegistracijaKnjigeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistracijaKnjigeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistracijaKnjigeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
