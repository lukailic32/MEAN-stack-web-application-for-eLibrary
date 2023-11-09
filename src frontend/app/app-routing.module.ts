import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministratorPrijavaComponent } from './administrator-prijava/administrator-prijava.component';
import { IstorijaZaduzenjaComponent } from './istorija-zaduzenja/istorija-zaduzenja.component';
import { KnjigaDetaljiComponent } from './knjiga-detalji/knjiga-detalji.component';
import { PocetnaStranicaComponent } from './pocetna-stranica/pocetna-stranica.component';
import { PregledSvegaComponent } from './pregled-svega/pregled-svega.component';
import { PregledZaduzenihKnjigaComponent } from './pregled-zaduzenih-knjiga/pregled-zaduzenih-knjiga.component';
import { PretragaComponent } from './pretraga/pretraga.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { ProfilComponent } from './profil/profil.component';
import { PzkComponent } from './pzk/pzk.component';
import { RegistracijaKnjigeComponent } from './registracija-knjige/registracija-knjige.component';
import { RegistracijaComponent } from './registracija/registracija.component';

const routes: Routes = [
  {path: "", component: PrijavaComponent},
  {path: "prijava", component: PrijavaComponent},
  {path: "administratorPrijava", component: AdministratorPrijavaComponent},
  {path: "registracija", component: RegistracijaComponent},
  {path: "pocetnaStranica", component: PocetnaStranicaComponent},
  {path: "registracijaKnjige", component: RegistracijaKnjigeComponent},
  {path: "profil", component: ProfilComponent},
  {path: "pretraga", component: PretragaComponent},
  {path: "knjigaDetalji", component: KnjigaDetaljiComponent},
  {path: "pzk", component: PzkComponent},
  {path: "istorijaZaduzenja", component: IstorijaZaduzenjaComponent},
  {path: "pregledZaduzenihKnjiga", component: PregledZaduzenihKnjigaComponent},
  {path: "pregledSvega", component: PregledSvegaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
