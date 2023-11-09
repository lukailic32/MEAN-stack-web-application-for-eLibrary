import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-administrator-prijava',
  templateUrl: './administrator-prijava.component.html',
  styleUrls: ['./administrator-prijava.component.css']
})
export class AdministratorPrijavaComponent implements OnInit {

  constructor(private korisnikService: KorisnikService, private router: Router) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(sessionStorage.getItem('prijavljen'));
    if (this.korisnik) this.router.navigate(['pocetnaStranica']);
  }

  korisnik: Korisnik
  korisnickoIme: string
  lozinka: string
  poruka: string;

  prijavaAdministratora(){
    this.korisnikService.prijava(this.korisnickoIme, this.lozinka).subscribe((korisnikIzDB: Korisnik) => {
      if (korisnikIzDB != null) {
        if (korisnikIzDB.tip == "A") {
          this.poruka = "";
          sessionStorage.setItem('prijavljen', JSON.stringify(korisnikIzDB));
          this.router.navigate(["pocetnaStranica"]);
        }
        else {
          this.poruka = "Za moderatore i citaoce koristite drugu formu!";
        }
      }
      else this.poruka = "Lose uneti podaci, pokusajte ponovo";
    })
  }


}
