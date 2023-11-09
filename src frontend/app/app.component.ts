import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from './models/korisnik';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private router: Router) { }

  title = 'frontend';

  ngOnInit(): void {
    this.korisnik = JSON.parse(sessionStorage.getItem("prijavljen"));
    if (this.korisnik) this.prijavljen = true;
    else this.prijavljen = false;
  }

  prijavljen: boolean
  korisnik: Korisnik

  prijava(){
    this.ngOnInit();
    this.router.navigate(['prijava']);
  }
  registracija(){
    this.router.navigate(['registracija']);
  }
  odjava(){
    
    sessionStorage.clear();
    this.ngOnInit();
    this.router.navigate(['prijava']);
  }
  pocetna(){
    this.ngOnInit();
    this.router.navigate(["pocetnaStranica"]);
  }
  pretraga(){
    this.router.navigate(['pretraga']);
  }
  registracijaKnjige(){
    this.router.navigate(['registracijaKnjige']);
  }
  pzk(){
    this.router.navigate(['pzk']);
  }
  istorijaZaduzenja(){
    this.router.navigate(['istorijaZaduzenja']);
  }
  pregledZaduzenihKnjiga(){
    this.router.navigate(['pregledZaduzenihKnjiga']);
  }
  pregledSvega(){
    this.router.navigate(['pregledSvega']);
  }
}
