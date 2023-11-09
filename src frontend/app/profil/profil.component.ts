import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  constructor(private router: Router, private korisnikService: KorisnikService) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(sessionStorage.getItem('prijavljen'));
    if (!this.korisnik) this.router.navigate(['pocetnaStranica']);

    this.korisnickoIme = this.korisnik.korisnickoIme;
    this.lozinka = this.korisnik.lozinka;
    this.imeIPrezime = this.korisnik.imeIPrezime;
    this.adresa = this.korisnik.adresa;
    this.kontaktTelefon = this.korisnik.kontaktTelefon;
    this.imejl = this.korisnik.imejl;
    this.imagePath = this.korisnik.imagePath;
    this.tip = this.korisnik.tip;
    this.staroKorisnickoIme = this.korisnickoIme;  
  }

  korisnik: Korisnik
  staraLozinka: string;
  novaLozinka: string;
  novaLozinkaPotvrda: string;
  poruka2: string;
  ok: boolean;
  korisnickoIme: string
  lozinka: string
  imeIPrezime: string
  adresa: string
  kontaktTelefon: number
  imejl: string
  imagePath: string
  tip: string
  staroKorisnickoIme: string
  reg: boolean
  poruka: string

  azuriraj(){
    this.reg = false;

    let lozinkaPattern = new RegExp("^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,12}$");
    let lozinkaSlovo = new RegExp("^[A-Z,a-z]", "i");

    if (!lozinkaPattern.test(this.lozinka)){
      this.poruka = 'Lozinka nije u trazenom formatu';
    }
    else if (!lozinkaSlovo.test(this.lozinka)){
      this.poruka = 'Lozinka nije u trazenom formatu';
    }
    else if (this.korisnickoIme == ""){
      this.poruka = "Obavezno uneti korisnicko ime";
    }
    else if (this.imejl == ""){
      this.poruka = "Obavezno uneti imejl";
    }
    else if (this.imeIPrezime == "") {
      this.poruka = "Obavezno uneti ime i prezime";
    }
    else if (this.adresa == "") {
      this.poruka = "Obavezno uneti adresu";
    }
    else {
      this.poruka = "";
      this.reg = true;
    }
  
    if (this.reg) {
      this.korisnikService.azuriraj(this.staroKorisnickoIme, this.korisnickoIme, this.lozinka, this.imeIPrezime, this.adresa, this.kontaktTelefon, this.imejl,
        this.korisnik.imagePath, this.korisnik.tip).subscribe((resp : Korisnik) => {
          this.korisnik = resp;
          sessionStorage.clear();
          sessionStorage.setItem('prijavljen', JSON.stringify(this.korisnik));
          alert('Uspesno azurirani podaci');
      })
    }
    else alert(this.poruka);
  }

  provera(){

    let lozinkaPattern = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,12}$")
    let lozinkaSlovo= new RegExp("^[A-Z,a-z]", "i");

    if (this.korisnik.lozinka != this.staraLozinka) {
      this.poruka2 = "Stara lozinka je pogresna!";
    }
    else if (!lozinkaPattern.test(this.novaLozinka) || !lozinkaSlovo.test(this.novaLozinka)) {
      this.poruka2 = "Los format nove lozinke!";
    }
    else if (this.novaLozinka != this.novaLozinkaPotvrda) {
      this.poruka2 = "Unete nove lozinke nisu identicne!";
    }
    else this.ok = true;
  }

  promeni(){
    this.ok = false;
    this.provera();
    if (this.ok) {
      this.korisnikService.promeni(this.korisnik.korisnickoIme, this.novaLozinka).subscribe((resObj) => {
        this.poruka = "";
        alert(resObj['poruka']);
        sessionStorage.clear();
        this.router.navigate(['prijava']);
      })
    }
  }
}
  