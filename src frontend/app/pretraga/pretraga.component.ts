import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KnjigaService } from '../knjiga.service';
import { Knjiga } from '../models/knjiga';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-pretraga',
  templateUrl: './pretraga.component.html',
  styleUrls: ['./pretraga.component.css']
})
export class PretragaComponent implements OnInit {

  constructor(private router: Router, private knjigaService: KnjigaService) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(sessionStorage.getItem('prijavljen'));
    if (!this.korisnik) this.prijavljen = false;
    else this.prijavljen = true; 
  }

  korisnik: Korisnik
  prijavljen: boolean
  pretragaParam: string
  naprednaPretragaParam: string
  zanr: string

  pretrazeneNaziv: Knjiga[]
  pretrazeneAutor: Knjiga[]
  pretrazeneKnjige: Knjiga[]

  pretraga(){
    this.knjigaService.pretragaNaziv(this.pretragaParam).subscribe((knjige: Knjiga[]) => {
      this.pretrazeneNaziv = knjige;
      
      this.knjigaService.pretragaAutor(this.pretragaParam).subscribe((knjige2: Knjiga[]) => {
        this.pretrazeneAutor = knjige2;
        this.pretrazeneKnjige = this.pretrazeneAutor;
        for (let i = 0; i < this.pretrazeneNaziv.length; i++) {
          let ima = false;
          for (let j = 0; j< this.pretrazeneAutor.length; j++) {
            if (this.pretrazeneNaziv[i].id == this.pretrazeneAutor[j].id)
              ima = true;
          }
          if (!ima) this.pretrazeneKnjige.push(this.pretrazeneNaziv[i]); 
        }
      })

    })

  }

  prebaciNaKnjigu(knjiga){
    if (this.prijavljen) this.router.navigate(['knjigaDetalji', {param: knjiga.id}]);
  }

  naprednaPretraga(){

  }

}
