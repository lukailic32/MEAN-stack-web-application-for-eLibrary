import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledZaduzenihKnjigaComponent } from './pregled-zaduzenih-knjiga.component';

describe('PregledZaduzenihKnjigaComponent', () => {
  let component: PregledZaduzenihKnjigaComponent;
  let fixture: ComponentFixture<PregledZaduzenihKnjigaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregledZaduzenihKnjigaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PregledZaduzenihKnjigaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
