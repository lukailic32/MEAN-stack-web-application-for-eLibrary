import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KnjigaService } from '../knjiga.service';
import { KorisnikService } from '../korisnik.service';
import { Knjiga } from '../models/knjiga';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-pzk',
  templateUrl: './pzk.component.html',
  styleUrls: ['./pzk.component.css']
})
export class PzkComponent implements OnInit {

  constructor(private knjigaService: KnjigaService, private router: Router, private korisnikService: KorisnikService) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(sessionStorage.getItem('prijavljen'));
    if (!this.korisnik) this.router.navigate(['pocetnaStranica']);
    if (this.korisnik.tip == "C" ) this.router.navigate(['pocetnaStranica']);

    this.knjigaService.dohvatiZahtevaneKnjige().subscribe((knjige : Knjiga[]) => {
      this.knjige = knjige;
      //????
      for (let i=0; i<this.knjige.length; i++){
        this.knjige[i].godina = new Date(this.knjige[i].godina.toString());
      }
      
    })

    this.korisnikService.dohvati().subscribe((kor: Korisnik[]) => {
      this.korisnici = kor;
    })
  }

  datestring: Date
  korisnik: Korisnik
  knjige: Knjiga[]
  korisnici: Korisnik[]

  prihvati(id){
    this.knjigaService.prihvati(id).subscribe((resp) => {
      alert(resp['poruka']);
      this.ngOnInit();
    })
  }

  odbaci(id){
    this.knjigaService.odbaci(id).subscribe((resp) => {
      alert(resp['poruka']);
      this.ngOnInit();
    })
  }

  prihvatiKorisnika(korisnickoIme){
    this.korisnikService.prihvatiKorisnika(korisnickoIme).subscribe((resp) =>{
      alert(resp['poruka']);
      this.ngOnInit();
    })
  }

  odbaciKorisnika(korisnickoIme){
    this.korisnikService.odbaciKorisnika(korisnickoIme).subscribe((resp) => {
      alert(resp['poruka']);
      this.ngOnInit();
    })
  }
}
