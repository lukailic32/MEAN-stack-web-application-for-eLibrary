import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KnjigaService } from '../knjiga.service';
import { KorisnikService } from '../korisnik.service';
import { Knjiga } from '../models/knjiga';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-pregled-zaduzenih-knjiga',
  templateUrl: './pregled-zaduzenih-knjiga.component.html',
  styleUrls: ['./pregled-zaduzenih-knjiga.component.css']
})
export class PregledZaduzenihKnjigaComponent implements OnInit {

  constructor(private router: Router, private knjigaService: KnjigaService, private korisnikService: KorisnikService) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(sessionStorage.getItem('prijavljen'));
    if (!this.korisnik) this.router.navigate(['pocetnaStranica']);
  }

  korisnik: Korisnik

  vrati(id, datumZaduzivanja){
    this.knjigaService.dohvatiKnjigu(id).subscribe((knjiga: Knjiga) => {
      this.knjigaService.vratiKnjigu(id, knjiga.naStanju, knjiga.zaduzena).subscribe((knjiga2: Knjiga) => {
        this.korisnikService.vratiKnjigu(this.korisnik.korisnickoIme, id, knjiga2.naziv, knjiga2.autori, knjiga2.imagePath, datumZaduzivanja).subscribe((resp: Korisnik)=>{
          this.korisnik = resp;
          sessionStorage.setItem('prijavljen', JSON.stringify(this.korisnik));
        })
      })

    })
  }

  detalji(id){

  }
}
