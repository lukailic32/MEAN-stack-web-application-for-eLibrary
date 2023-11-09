import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { KnjigaService } from '../knjiga.service';
import { KorisnikService } from '../korisnik.service';
import { Knjiga } from '../models/knjiga';
import { Korisnik } from '../models/korisnik';
import { mimetype } from '../registracija/mime-type.validator';

@Component({
  selector: 'app-knjiga-detalji',
  templateUrl: './knjiga-detalji.component.html',
  styleUrls: ['./knjiga-detalji.component.css']
})
export class KnjigaDetaljiComponent implements OnInit {

  constructor(private route: ActivatedRoute, private knjigaService: KnjigaService, private korisnikService: KorisnikService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('param');
    this.knjigaService.dohvatiKnjigu(this.id).subscribe((resKnjiga: Knjiga) => {
      this.knjiga = resKnjiga;
      this.form = new FormGroup({
        image: new FormControl(null, {asyncValidators:[mimetype]}),
        naziv: new FormControl(this.knjiga.naziv),
        autori: new FormControl(this.knjiga.autori),
        zanrovi: new FormControl(this.knjiga.zanrovi),
        izdavac: new FormControl(this.knjiga.izdavac),
        godina: new FormControl(this.knjiga.godina),
        jezik: new FormControl(this.knjiga.jezik),
        naStanju: new FormControl(this.knjiga.naStanju)
        
      })
   
    })
    this.korisnik = JSON.parse(sessionStorage.getItem('prijavljen'));
    

  }

  id: string
  knjiga: Knjiga
  korisnik: Korisnik
  form: FormGroup

  Pickedimage: string
  image: string
  poruka: string


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

  azuriraj(){
    if (this.form.value.image) {
      this.knjigaService.azurirajSlika(this.knjiga.id, this.form.value.naziv, this.form.value.autori, this.form.value.zanrovi.toString(), this.form.value.izdavac,
        this.form.value.jezik, this.form.value.naStanju, this.form.value.image).subscribe((resp: Knjiga) => {
          this.knjiga = resp;
          alert("Uspesno azurirane informacije!");
          this.ngOnInit();
        })
    }
    else {
      this.knjigaService.azuriraj(this.knjiga.id, this.form.value.naziv, this.form.value.autori, this.form.value.zanrovi.toString(), this.form.value.izdavac, this.form.value.jezik,
        this.form.value.naStanju).subscribe((resp: Knjiga) => {
        this.knjiga = resp;
        this.ngOnInit();
        alert("Uspesno azurirane informacije!");
      })
    }
  }

  korisnikNemaOvuKnjigu(): boolean{
    let bool = true;
    if (this.korisnik.zaduzeneKnjige){
      for (let i = 0; i < this.korisnik.zaduzeneKnjige.length; i++){
        if (this.korisnik.zaduzeneKnjige[i].id == this.knjiga.id) bool = false; 
      }
    }
    return bool;
  }

  zaduzi(){
    if (!this.korisnikNemaOvuKnjigu()) this.poruka = "Korisnik vec ima ovu knjigu na zaduzenju!";
    else if (this.korisnik.zaduzeneKnjige && this.korisnik.zaduzeneKnjige.length == 3) this.poruka = "Ovaj korisnik vec ima zaduzene 3 knjige!";
    else if (parseInt(this.knjiga.naStanju) == 0) this.poruka = "Ove knjige nema na stanju!";
    else {

      this.knjigaService.zaduziKnjigu(this.knjiga.id, this.knjiga.naStanju, this.knjiga.zaduzena, this.knjiga.brojUzimanja).subscribe((resp: Knjiga) => {
        this.knjiga = resp;
        console.log(this.knjiga.id);
        console.log(this.knjiga.naziv);
        this.korisnikService.zaduziKnjigu(this.korisnik.korisnickoIme, this.knjiga.id, this.knjiga.naziv, this.knjiga.autori, this.knjiga.imagePath)
        .subscribe((respObj : Korisnik) => {
          this.korisnik = respObj;
          sessionStorage.removeItem('prijavljen');
          sessionStorage.setItem('prijavljen', JSON.stringify(this.korisnik));
        })
      })
    }
  }
}
