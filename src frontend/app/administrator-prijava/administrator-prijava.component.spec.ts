import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorPrijavaComponent } from './administrator-prijava.component';

describe('AdministratorPrijavaComponent', () => {
  let component: AdministratorPrijavaComponent;
  let fixture: ComponentFixture<AdministratorPrijavaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministratorPrijavaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorPrijavaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
