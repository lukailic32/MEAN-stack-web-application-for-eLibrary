import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KnjigaService } from '../knjiga.service';
import { Knjiga } from '../models/knjiga';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-pocetna-stranica',
  templateUrl: './pocetna-stranica.component.html',
  styleUrls: ['./pocetna-stranica.component.css']
})
export class PocetnaStranicaComponent implements OnInit {

  constructor(private router: Router, private knjigaService: KnjigaService) { }

  ngOnInit(): void {
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }
    this.knjigaService.dohvatiKnjige().subscribe((knjige: Knjiga[]) => {
      this.knjige = knjige;
      this.knjige = this.sortirajPoPreuzimanjima();
      //if (!this.knjigaService.knjigaZaDanas) {
        //this.knjigaService.knjigaDana = this.knjige[Math.floor(Math.random()*knjige.length)];
        //this.knjigaService.knjigaZaDanas = true;
      //}

      this.knjigaDana = this.knjige[((new Date().getFullYear() + new Date().getDay()) % this.knjige.length)];
    });

    this.korisnik = JSON.parse(sessionStorage.getItem("prijavljen"));
    if (this.korisnik) this.prijavljen = true;
    else this.prijavljen = false;


  }

  
  knjige: Knjiga[]
  prijavljen: boolean
  korisnik: Korisnik
  knjigaDana: Knjiga

  sortirajPoPreuzimanjima(): Knjiga[] {
    let sortiraneKnjige = this.knjige;
    return sortiraneKnjige.sort((knjiga1, knjiga2)=>{
      return (parseInt(knjiga2.brojUzimanja) - parseInt(knjiga1.brojUzimanja))
    })
  }
  
}
