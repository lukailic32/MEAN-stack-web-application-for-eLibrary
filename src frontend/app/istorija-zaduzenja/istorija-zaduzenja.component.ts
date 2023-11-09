import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { ZaduzenaKnjiga } from '../models/zaduzenaKnjiga';

@Component({
  selector: 'app-istorija-zaduzenja',
  templateUrl: './istorija-zaduzenja.component.html',
  styleUrls: ['./istorija-zaduzenja.component.css']
})
export class IstorijaZaduzenjaComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(sessionStorage.getItem('prijavljen'));
    if (!this.korisnik) this.router.navigate(['pocetnaStranica']);
    this.korisnik.istorijaZaduzenja = this.sortirajPoDatumuVracanja();
  }

  korisnik: Korisnik

  prebaciNaKnjigu(knjiga){
    this.router.navigate(['knjigaDetalji', {param: knjiga.id}]);
  }

  sortirajPoNazivu(): ZaduzenaKnjiga[] {
    let sortiraneKnjige = this.korisnik.istorijaZaduzenja;
    return sortiraneKnjige.sort((knjiga1, knjiga2)=>{
      return knjiga1.naziv.localeCompare(knjiga2.naziv);
    })
  }

  sortirajPoAuotorima(): ZaduzenaKnjiga[] {
    let sortiraneKnjige = this.korisnik.istorijaZaduzenja;
    return sortiraneKnjige.sort((knjiga1, knjiga2)=>{
      return knjiga1.autori.localeCompare(knjiga2.autori);
    })
  }

  //POTENCIJALNO PROBLEM SA NULL
  sortirajPoDatumuVracanja(): ZaduzenaKnjiga[]{
    let sortiraneKnjige = this.korisnik.istorijaZaduzenja;
    return sortiraneKnjige.sort((knjiga1, knjiga2)=> {
      if (knjiga1.datumVracanja < knjiga2.datumVracanja){
        return -1;
      }else {
        if(knjiga1.datumVracanja == knjiga2.datumVracanja) {
          return 0;
        }
        else return -1;
      }
    })
  }

  sortirajPoDatumuZaduzivanja(): ZaduzenaKnjiga[]{
    let sortiraneKnjige = this.korisnik.istorijaZaduzenja;
    return sortiraneKnjige.sort((knjiga1, knjiga2)=> {
      if (knjiga1.datumZaduzivanja < knjiga2.datumZaduzivanja){
        return -1;
      }else {
        if(knjiga1.datumZaduzivanja == knjiga2.datumZaduzivanja) {
          return 0;
        }
        else return 1;
      }
    })
  }

  spa(){
    this.korisnik.istorijaZaduzenja = this.sortirajPoAuotorima();
    
  }
  spn(){
    this.korisnik.istorijaZaduzenja = this.sortirajPoNazivu();
  }
  spdv(){
    this.korisnik.istorijaZaduzenja = this.sortirajPoDatumuVracanja();
  }
  spdz(){
    this.korisnik.istorijaZaduzenja = this.sortirajPoDatumuZaduzivanja();
  }
}
