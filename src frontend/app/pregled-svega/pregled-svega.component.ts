import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KnjigaService } from '../knjiga.service';
import { KorisnikService } from '../korisnik.service';
import { Knjiga } from '../models/knjiga';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-pregled-svega',
  templateUrl: './pregled-svega.component.html',
  styleUrls: ['./pregled-svega.component.css']
})
export class PregledSvegaComponent implements OnInit {

  constructor(private router: Router, private knjigaService: KnjigaService, private korisnikService: KorisnikService) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(sessionStorage.getItem('prijavljen'));
    if (this.korisnik.tip != 'A') this.router.navigate(['pocetnaStranica']);

    this.knjigaService.dohvatiKnjige().subscribe((knjige: Knjiga[]) => {
      this.sveKnjige = knjige;
    })

    this.korisnikService.dohvatiKorisnike().subscribe((kor: Korisnik[]) => {
      this.sviKorisnici = kor;
    })
    this.azurirajKorisnika = null;
    this.azKor = false;
    this.azKnj = false;
  }

  korisnik: Korisnik
  sviKorisnici: Korisnik[]
  sveKnjige: Knjiga[]
  azurirajKorisnika: Korisnik
  azKor: boolean
  azKnj: boolean

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

  id: string
  naziv: string
  autori: string
  zanrovi: string
  izdavac: string
  jezik: string
  naStanju: number
  rok: number
  imagePathKnjiga: string
  
  azurirajKor(kor){
    this.azKor = true;
    this.azurirajKorisnika = kor;
    this.korisnickoIme = this.azurirajKorisnika.korisnickoIme;
    this.lozinka = this.azurirajKorisnika.lozinka;
    this.imeIPrezime = this.azurirajKorisnika.imeIPrezime;
    this.adresa = this.azurirajKorisnika.adresa;
    this.kontaktTelefon = this.azurirajKorisnika.kontaktTelefon;
    this.imejl = this.azurirajKorisnika.imejl;
    this.imagePath = this.azurirajKorisnika.imagePath;
    this.tip = this.azurirajKorisnika.tip;
    this.staroKorisnickoIme = this.azurirajKorisnika.korisnickoIme;
  }

  azurirajK(){
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
    else if (this.tip != "M" && this.tip != "C") this.poruka = "Tip mora biti C ili M"
    else {
      this.poruka = "";
      this.reg = true;
    }
  
    if (this.reg) {
      this.korisnikService.azuriraj(this.staroKorisnickoIme, this.korisnickoIme, this.lozinka, this.imeIPrezime, this.adresa, this.kontaktTelefon, this.imejl,
        this.imagePath, this.tip).subscribe((resp : Korisnik) => {
          this.azKor = false;
          
          alert(['Uspesno azurirani podaci']);
          this.ngOnInit();
      })
    }
    else alert(this.poruka);
  }

  izbrisiKor(kor){
    if (kor.zaduzeneKnjige && kor.zaduzeneKnjige.length > 0) {
      alert(['Ne moze se obrisati ovaj korisnik jer duguje knjige']);
    }
    else {
      this.korisnikService.odbaciKorisnika(kor.korisnickoIme).subscribe((resp) => {
        alert(['Korisnik je izbrisan!']);
        this.ngOnInit();
      })
    }
  }

  izbrisiKnj(knjiga){
    if (knjiga.zaduzena != 0){
      alert(['Ne moze se obrisati ova knjiga jer je zaduzena']);
    }
    else {
      this.knjigaService.odbaci(knjiga.id).subscribe((resp) => {
        alert(['Knjiga je izbrisana!']);
        this.ngOnInit();
      })
    }
  }

  azurirajKnj(knjiga){
    this.azKnj = true;
    this.id = knjiga.id;
    this.naziv = knjiga.naziv;
    this.autori = knjiga.autori;
    this.zanrovi = knjiga.zanrovi;
    this.izdavac = knjiga.izdavac;
    this.jezik = knjiga.jezik;
    this.naStanju = knjiga.naStanju;
    this.rok = knjiga.rok;
    this.imagePathKnjiga = knjiga.imagePath;

  }

  azurirajKnjig(){
    this.knjigaService.azurirajK(this.id, this.naziv, this.autori, this.zanrovi.toString(), this.izdavac, this.jezik,
    this.naStanju, this.rok).subscribe((resp: Knjiga) => {
    console.log(resp.rok);
    alert(['Uspesno azurirane informacije!']);
    this.ngOnInit();
  })
  }
}
