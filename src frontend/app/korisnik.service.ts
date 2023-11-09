import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Korisnik } from './models/korisnik';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  prijava(korisnickoIme, lozinka){
    const data = {
      korisnickoIme: korisnickoIme,
      lozinka: lozinka
    }

    return this.http.post(`${this.uri}/korisnici/prijava`, data);
  }

  registracijaProvera(korisnickoIme, imejl) {
    const data = {
      korisnickoIme: korisnickoIme,
      imejl: imejl
    }

    return this.http.post(`${this.uri}/korisnici/registracijaProvera`, data);
  }

  registracijaSaSlikom(imeIPrezime, korisnickoIme, lozinka, adresa, kontaktTelefon, imejl, image, zahtev) {
    const postData = new FormData();
    postData.append("korisnickoIme", korisnickoIme);
    postData.append("imeIPrezime", imeIPrezime);
    postData.append("lozinka", lozinka);
    postData.append("adresa", adresa);
    postData.append("kontaktTelefon", kontaktTelefon.toString());
    postData.append("imejl", imejl);
    postData.append("image", image, korisnickoIme);
    postData.append("zahtev", zahtev);
  
    return this.http.post(`${this.uri}/korisnici/registracijaSaSlikom`, postData);
  }

  registracijaBezSlike(imeIPrezime, korisnickoIme, lozinka, adresa, kontaktTelefon, imejl, zahtev) {
    const data = {
      korisnickoIme: korisnickoIme,
      imeIPrezime: imeIPrezime,
      lozinka: lozinka,
      adresa: adresa,
      kontaktTelefon: kontaktTelefon,
      imejl: imejl,
      zahtev: zahtev
    }

    return this.http.post(`${this.uri}/korisnici/registracijaBezSlike`, data);
  }

  promeni(korisnickoIme, novaLozinka) {
    const data = {
      korisnickoIme: korisnickoIme,
      novaLozinka: novaLozinka
    }

    return this.http.post(`${this.uri}/korisnici/promenaLozinke`, data);
  }

  dohvati(){
    return this.http.get(`${this.uri}/korisnici/dohvati`);
  }

  dohvatiKorisnike() {
    return this.http.get(`${this.uri}/korisnici/dohvatiKorisnike`);
  }

  dohvatiKorisnika(korisnickoIme){
    const data = {
      korisnickoIme: korisnickoIme
    }

    return this.http.post(`${this.uri}/korisnici/dohvatiKorisnika`, data);
  }

  prihvatiKorisnika(korisnickoIme) {
    const data = {
      korisnickoIme: korisnickoIme
    }

    return this.http.post(`${this.uri}/korisnici/prihvatiKorisnika`, data);
  }

  odbaciKorisnika(korisnickoIme) {
    const data = {
      korisnickoIme: korisnickoIme
    }

    return this.http.post(`${this.uri}/korisnici/odbaciKorisnika`, data);

  }

  azuriraj(staroKorisnickoIme, korisnickoIme, lozinka, imeIPrezime, adresa, kontaktTelefon, imejl, imagePath, tip) {
    const data = {
      staroKorisnickoIme: staroKorisnickoIme,
      korisnickoIme: korisnickoIme,
      lozinka: lozinka,
      imeIPrezime: imeIPrezime,
      adresa: adresa,
      kontaktTelefon: kontaktTelefon,
      imejl: imejl,
      imagePath: imagePath,
      tip: tip
    }

    return this.http.post(`${this.uri}/korisnici/azuriraj`, data);
  }

  zaduziKnjigu(korisnickoIme, id, naziv, autori, imagePath){
    const data = {
      korisnickoIme: korisnickoIme,
      id: id,
      naziv: naziv,
      autori: autori,
      imagePath: imagePath
    }
    return this.http.post(`${this.uri}/korisnici/zaduziKnjigu`, data);
  }

  vratiKnjigu(korisnickoIme, id, naziv, autori, imagePath, datumZaduzivanja){
    const data = {
      korisnickoIme: korisnickoIme,
      id: id,
      naziv: naziv,
      autori: autori,
      imagePath: imagePath,
      datumZaduzivanja: datumZaduzivanja
    }
    return this.http.post(`${this.uri}/korisnici/vratiKnjigu`, data);
  }
}
