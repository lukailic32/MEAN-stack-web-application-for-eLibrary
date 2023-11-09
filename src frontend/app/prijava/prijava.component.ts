import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css']
})
export class PrijavaComponent implements OnInit {

  constructor(private korisnikService: KorisnikService, private router: Router) { }

  /* ng add @angular/material kad sam dodavao kartice
  (samo dodali stvari u hrefove u index i importovalo BrowserAnimationsModule)
    ng add @ng-bootstrap/ng-bootstrap kad sam ubacivao slajder
    u indexu iznad /body taga -> <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa" crossorigin="anonymous"></script>
    u indexu iznad /head taga -> <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">

  */
  ngOnInit(): void {
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }
    this.korisnik = JSON.parse(sessionStorage.getItem('prijavljen'));
    if (this.korisnik) this.router.navigate(['pocetnaStranica']);
  }

  korisnik: Korisnik
  korisnickoIme: string
  lozinka: string
  poruka: string;

  prijava(){
    this.korisnikService.prijava(this.korisnickoIme, this.lozinka).subscribe((korisnikIzDB: Korisnik) => {
      
      if (korisnikIzDB != null) {
        if (korisnikIzDB.tip == "A") {
          this.poruka = "Za administratora koristite drugu formu za prijavu!";
        }
        else if (korisnikIzDB.tip == "M") {
          this.poruka = "";
          sessionStorage.setItem('prijavljen', JSON.stringify(korisnikIzDB));
          this.router.navigate(["pocetnaStranica"]);
        }
        else if (korisnikIzDB.tip == "C") {
          this.poruka = "";
          sessionStorage.setItem('prijavljen', JSON.stringify(korisnikIzDB));
          this.router.navigate(["pocetnaStranica"]);
        }
      }
      else this.poruka = "Lose uneti podaci, pokusajte ponovo";
    })
  }

}
