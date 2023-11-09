import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../models/korisnik';
import { mimetype } from './mime-type.validator';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {

  constructor(private korisnikService: KorisnikService, private router: Router) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(sessionStorage.getItem('prijavljen'));
    if (this.korisnik && this.korisnik.tip != "A") this.router.navigate(['pocetnaStranica']);
    this.form = new FormGroup({
      image: new FormControl(null, {asyncValidators:[mimetype]}),
      korisnickoIme: new FormControl(null),
      lozinka: new FormControl(null),
      lozinka2:  new FormControl(null),
      imeIPrezime:  new FormControl(null),
      adresa:  new FormControl(null),
      kontaktTelefon: new FormControl(null),
      imejl: new FormControl(null)
    })
  }

  form: FormGroup;
  korisnik: Korisnik;

  poruka: string;
  korisnickoIme: string;
  lozinka: string;
  lozinka2: string;
  imeIPrezime: string;
  adresa: string;
  kontaktTelefon: number;
  imejl: string;
  Pickedimage: string;
  zahtev: string;
  reg: boolean;

  proveraPodataka(){
    let lozinkaPattern = new RegExp("^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,12}$");
    let lozinkaSlovo = new RegExp("^[A-Z,a-z]", "i");

    if (this.form.value.lozinka!=this.form.value.lozinka2){
      this.poruka = 'Unete sifre nisu identicne';
    }
    else if (!lozinkaPattern.test(this.form.value.lozinka)){
      this.poruka = 'Lozinka nije u trazenom formatu';
    }
    else if (!lozinkaSlovo.test(this.form.value.lozinka)){
      this.poruka = 'Lozinka nije u trazenom formatu';
    }
    else if (this.form.value.korisnickoIme == ""){
      this.poruka = "Obavezno uneti korisnicko ime";
    }
    else if (this.form.value.imejl == ""){
      this.poruka = "Obavezno uneti imejl";
    }
    else if (this.form.value.imeIPrezime == "") {
      this.poruka = "Obavezno uneti ime i prezime";
    }
    else if (this.form.value.adresa == "") {
      this.poruka = "Obavezno uneti adresu";
    }
    else {
      this.poruka = "";
      this.reg = true;
    }
  }

  registracija(){
    this.reg = false;
    this.proveraPodataka();
    if (this.reg) {
      if (this.korisnik) this.zahtev = "O";
      else this.zahtev = "Z";
      this.korisnikService.registracijaProvera(this.form.value.korisnickoIme, this.form.value.imejl).subscribe((korisnikIzDB : Korisnik) => {
        if (korisnikIzDB) {
          if (korisnikIzDB.korisnickoIme == this.form.value.korisnickoIme) {
            this.poruka = "Vec postoji korisnik sa ovim koriscnickim imenom.";
          }
          else {
            this.poruka = "Vec postoji korisnik sa ovim imejlom."
          }
        } else {
          if (this.form.value.image) {
            this.korisnikService.registracijaSaSlikom(this.form.value.imeIPrezime, this.form.value.korisnickoIme,this.form.value.lozinka,
            this.form.value.adresa,this.form.value.kontaktTelefon,this.form.value.imejl, this.form.value.image, this.zahtev).subscribe((resObj) => {
              this.poruka = 'Uspesno kreiran korisnik!';
              this.form.reset();
          })
          } else {
            this.korisnikService.registracijaBezSlike(this.form.value.imeIPrezime, this.form.value.korisnickoIme,this.form.value.lozinka,
            this.form.value.adresa,this.form.value.kontaktTelefon,this.form.value.imejl, this.zahtev).subscribe((resObj) => {
              this.poruka = 'Uspesno kreiran korisnik!';
              this.form.reset();
            })
          }
        }
      })
    }
  }

  PickedImage(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = ()=>{  
      this.Pickedimage = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
