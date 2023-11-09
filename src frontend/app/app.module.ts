import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { HttpClientModule } from '@angular/common/http';
import { AdministratorPrijavaComponent } from './administrator-prijava/administrator-prijava.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { PocetnaStranicaComponent } from './pocetna-stranica/pocetna-stranica.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfilComponent } from './profil/profil.component';
import { RegistracijaKnjigeComponent } from './registracija-knjige/registracija-knjige.component';
import { PretragaComponent } from './pretraga/pretraga.component';
import { KnjigaDetaljiComponent } from './knjiga-detalji/knjiga-detalji.component';
import { PzkComponent } from './pzk/pzk.component';
import { IstorijaZaduzenjaComponent } from './istorija-zaduzenja/istorija-zaduzenja.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PregledZaduzenihKnjigaComponent } from './pregled-zaduzenih-knjiga/pregled-zaduzenih-knjiga.component';
import { PregledSvegaComponent } from './pregled-svega/pregled-svega.component';

@NgModule({
  declarations: [
    AppComponent,
    PrijavaComponent,
    AdministratorPrijavaComponent,
    RegistracijaComponent,
    PocetnaStranicaComponent,
    ProfilComponent,
    RegistracijaKnjigeComponent,
    PretragaComponent,
    KnjigaDetaljiComponent,
    PzkComponent,
    IstorijaZaduzenjaComponent,
    PregledZaduzenihKnjigaComponent,
    PregledSvegaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
