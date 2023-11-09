import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { KnjigaService } from '../knjiga.service';
import { Knjiga } from '../models/knjiga';
import { Korisnik } from '../models/korisnik';
import { mimetype } from '../registracija/mime-type.validator';

@Component({
  selector: 'app-registracija-knjige',
  templateUrl: './registracija-knjige.component.html',
  styleUrls: ['./registracija-knjige.component.css']
})
export class RegistracijaKnjigeComponent implements OnInit {

  constructor(private router: Router,private knjigaService: KnjigaService) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(sessionStorage.getItem('prijavljen'));
    if (!this.korisnik) this.router.navigate(['pocetnaStranica']);
    this.form = new FormGroup({
      image: new FormControl(null, {asyncValidators:[mimetype]}),
      naziv: new FormControl(null),
      autori: new FormControl(null),
      zanrovi: new FormControl(null),
      izdavac: new FormControl(null),
      godina: new FormControl(null),
      jezik: new FormControl(null)
    });
    this.knjigaService.dohvatiKnjige().subscribe((knjige: Knjiga[]) => {
      this.knjige = knjige
      //AKO JE PRAZNA BAZA MORA DA SE UBACI JOS JEDAN IF ELSE ZA SETOVANJE ID NA 0
      this.knjigaService.dohvatiZahtevaneKnjige().subscribe((zk : Knjiga[]) => {
        if (zk.length != 0 && this.knjige.length != 0) {
          if (parseInt(this.knjige[this.knjige.length - 1].id) > parseInt(zk[zk.length-1].id))        
            this.knjigaService.idKnjige = parseInt(this.knjige[this.knjige.length - 1].id);
          else this.knjigaService.idKnjige = parseInt(zk[zk.length - 1].id);
          
        } else if (this.knjige.length != 0){
          this.knjigaService.idKnjige = parseInt(this.knjige[this.knjige.length-1].id);
        } else if (zk.length != 0){
          this.knjigaService.idKnjige = parseInt(zk[zk.length - 1].id);
        } else this.knjigaService.idKnjige = 0;
        
      })
    })
    
  }

  korisnik: Korisnik
  form: FormGroup
  Pickedimage: string
  poruka: string
  reg: boolean
  knjige: Knjiga[]
  brojUzimanja: string
  zahtevao: string

  PickedImage(event: Event){
    if (event.target){
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

  proveraPodataka(){
    this.reg = false;
    if (this.form.value.naziv == "") this.poruka = "Obavezno uneti naziv knjige";
    else if (this.form.value.autori == "" ) this.poruka = "Obavezno uneti autora knjige";
    else if (this.form.value.zanrovi.length == 0) this.poruka = "Obavezno izabrati neki zanr";
    else if (this.form.value.zanrovi.length > 3) this.poruka = "Maksimalno je dozvoljeno izabrati 3 zanra";
    else if (this.form.value.izdavac == "") this.poruka = "Obavezno navesti izdavaca";
    else if (!this.form.value.godina) this.poruka = "Obavezno izabrati datum";
    else if (this.form.value.jezik ==  "") this.poruka = "Obavezno navesti jezik";
    else { this.poruka = ''; this.reg = true;}


  }


  registracijaKnjige(){
    this.proveraPodataka();
    if (this.reg) {
      this.knjigaService.idKnjige++;
      //provera da li knjigu dodaje moderator ili citalac salje zahtev
      if (this.korisnik.tip == "C") this.brojUzimanja = "-1";
      else this.brojUzimanja = "0";
      //Ko je zahtevao registraciju nove knjige
      this.zahtevao = this.korisnik.korisnickoIme;
      if(this.form.value.image){
        this.knjigaService.registracijaKnjigeSaSlikom(this.form.value.naziv, this.form.value.autori, this.form.value.zanrovi, this.form.value.izdavac, this.form.value.godina, 
          this.form.value.jezik, this.brojUzimanja, this.zahtevao, this.form.value.image).subscribe((knjiga: Knjiga) => {
            console.log('Uspesno registrovana knjiga sa slikom');
            this.form.reset();
        })
      } else {
        this.knjigaService.registracijaKnjigeBezSlike(this.form.value.naziv, this.form.value.autori, this.form.value.zanrovi, this.form.value.izdavac, this.form.value.godina, 
          this.form.value.jezik, this.brojUzimanja, this.zahtevao).subscribe((knjiga: Knjiga)=>{
            console.log('Uspesno registrovana knjiga bez slike');
            this.form.reset();
          })
      }
    }
  }

}
