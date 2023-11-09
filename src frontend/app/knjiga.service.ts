import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Knjiga } from './models/knjiga';

@Injectable({
  providedIn: 'root'
})
export class KnjigaService {

  constructor(private http: HttpClient) { }
  
  knjige: Knjiga[]
  idKnjige: number
  knjigaDana: Knjiga
  knjigaZaDanas: boolean
  uri = 'http://localhost:4000';

  dohvatiKnjige(){
    return this.http.get(`${this.uri}/knjige/dohvatiKnjige`); 
  }

  registracijaKnjigeSaSlikom(naziv, autori, zanrovi, izdavac, godina, jezik,brojUzimanja, zahtevao, image) {
    let postData = new FormData();
    postData.append("naziv", naziv);
    postData.append("autori", autori);
    postData.append("zanrovi", zanrovi);
    postData.append("izdavac", izdavac);
    postData.append("godina", godina);
    postData.append("jezik", jezik);
    postData.append("brojUzimanja", brojUzimanja);
    postData.append("zahtevao", zahtevao);
    postData.append("image", image);
    postData.append("id", this.idKnjige.toString());

    return this.http.post(`${this.uri}/knjige/registracijaKnjigeSaSlikom`, postData);
  }

  registracijaKnjigeBezSlike(naziv, autori, zanrovi, izdavac, godina, jezik, brojUzimanja, zahtevao){

    const data = {
      naziv: naziv,
      autori: autori,
      zanrovi: zanrovi,
      izdavac: izdavac,
      godina: godina,
      jezik: jezik,
      brojUzimanja: brojUzimanja,
      zahtevao: zahtevao,
      id: this.idKnjige.toString(),
    }

    return this.http.post(`${this.uri}/knjige/registracijaKnjigeBezSlike`, data);
  }

  pretragaNaziv(naziv){
    const data = {
      naziv: naziv
    }
    return this.http.post(`${this.uri}/knjige/pretragaNaziv`, data);
  }

  pretragaAutor(autori){
    const data = {
      autori: autori
    }
    return this.http.post(`${this.uri}/knjige/pretragaAutor`, data);
  }

  dohvatiKnjigu(id){
    const data = {
      id: id
    }
    return this.http.post(`${this.uri}/knjige/dohvatiKnjigu`, data);
  }

  dohvatiZahtevaneKnjige(){
    return this.http.get(`${this.uri}/knjige/dohvatiZahtevaneKnjige`);
  }

  prihvati(id){
    const data = {
      id: id
    }
    return this.http.post(`${this.uri}/knjige/prihvati`, data);
  }

  odbaci(id){
    const data = {
      id: id
    }
    return this.http.post(`${this.uri}/knjige/odbaci`, data);
  }

  azurirajSlika(id, naziv, autori, zanrovi, izdavac, jezik, naStanju, image){
    let postData = new FormData();
    postData.append("naziv", naziv);
    postData.append("autori", autori);
    postData.append("zanrovi", zanrovi);
    postData.append("izdavac", izdavac);
    postData.append("jezik", jezik);
    postData.append("image", image);
    postData.append("id", id);
    postData.append("naStanju", naStanju);
  
    return this.http.post(`${this.uri}/knjige/azurirajSlika`, postData);
  }

  azuriraj(id, naziv, autori, zanrovi, izdavac, jezik, naStanju){
    const data = {
      id: id,
      naziv: naziv,
      autori: autori,
      zanrovi: zanrovi,
      izdavac: izdavac,
      jezik: jezik,
      naStanju: naStanju
    }

    return this.http.post(`${this.uri}/knjige/azuriraj`, data);
  }

  azurirajK(id, naziv, autori, zanrovi, izdavac, jezik, naStanju, rok){
    const data = {
      id: id,
      naziv: naziv,
      autori: autori,
      zanrovi: zanrovi,
      izdavac: izdavac,
      jezik: jezik,
      naStanju: naStanju,
      rok: rok
    }

    return this.http.post(`${this.uri}/knjige/azurirajK`, data);
  }

  zaduziKnjigu(id, naStanju, zaduzena, brojUzimanja){
    const data = {
      id: id,
      naStanju: naStanju,
      zaduzena: zaduzena,
      brojUzimanja: brojUzimanja 
    }

    return this.http.post(`${this.uri}/knjige/zaduziKnjigu`, data);
  }

  vratiKnjigu(id, naStanju, zaduzena){
    const data = {
      id: id,
      naStanju: naStanju,
      zaduzena: zaduzena,
    }

    return this.http.post(`${this.uri}/knjige/vratiKnjigu`, data);
  }
}
