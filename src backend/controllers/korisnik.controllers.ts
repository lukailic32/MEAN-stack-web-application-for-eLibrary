import express from 'express'
import KorisnikModel from '../models/korisnik'

export class KorisnikKontroler {

    prijava = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;
        let lozinka = req.body.lozinka;
        KorisnikModel.findOne({'korisnickoIme' : korisnickoIme, 'lozinka': lozinka }, (err, kor) => {
            if (err) console.log(err);
            else res.json(kor);
        })
    }

    registracijaProvera = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;
        let imejl = req.body.imejl;

        KorisnikModel.findOne({'korisnickoIme' : korisnickoIme}, (err, kor) => {
            if (err) console.log(err);
            else if (kor){
                res.json(kor);
            } else {
                KorisnikModel.findOne({'imejl' : imejl}, (err, koris) => {
                    if (err) console.log(err);
                    else res.json(koris);
                })
            }
        })
    }

    registracijaSaSlikom = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;
        let imeIPrezime = req.body.imeIPrezime;
        let lozinka = req.body.lozinka;
        let adresa = req.body.adresa;
        let kontaktTelefon = req.body.kontaktTelefon;
        let imejl = req.body.imejl;
        const url = req.protocol + "://" + req.get("host");
        let imagePath = url + "/images/" + req.file.filename;
        let zahtev = req.body.zahtev;

        let korisnik = new KorisnikModel();

        korisnik.korisnickoIme = korisnickoIme;
        korisnik.imeIPrezime = imeIPrezime;
        korisnik.lozinka = lozinka;
        korisnik.adresa = adresa;
        korisnik.kontaktTelefon = kontaktTelefon;
        korisnik.imejl = imejl;
        korisnik.tip = "C";
        korisnik.imagePath = imagePath;
        korisnik.zahtev = zahtev;
        

        korisnik.save((err, resp) => {
            if (err) console.log(err);
            else console.log('Dodat korisnik');
        })
    }

    registracijaBezSlike = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;
        let imeIPrezime = req.body.imeIPrezime;
        let lozinka = req.body.lozinka;
        let adresa = req.body.adresa;
        let kontaktTelefon = req.body.kontaktTelefon;
        let imejl = req.body.imejl;
        let imagePath = "http://localhost:4000/images/USER.png";
        let zahtev = req.body.zahtev;

        let korisnik = new KorisnikModel();

        korisnik.korisnickoIme = korisnickoIme;
        korisnik.imeIPrezime = imeIPrezime;
        korisnik.lozinka = lozinka;
        korisnik.adresa = adresa;
        korisnik.kontaktTelefon = kontaktTelefon;
        korisnik.imejl = imejl;
        korisnik.tip = "C";
        korisnik.imagePath = imagePath;
        korisnik.zahtev = zahtev;

        korisnik.save((err, resp) => {
            if (err) console.log(err);
            else console.log('Dodat korisnik');
        })
    }

    promeni = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;
        let novaLozinka = req.body.novaLozinka;

        KorisnikModel.updateOne({'korisnickoIme' : korisnickoIme}, {$set : {'lozinka' : novaLozinka}}, (err, resp) => {
            if (err) console.log(err);
            else res.json({'poruka' : 'promenjena lozinka'});
        })
    }

    azuriraj = (req: express.Request, res: express.Response) => {
        let staroKorisnickoIme = req.body.staroKorisnickoIme;
        let korisnickoIme = req.body.korisnickoIme;
        let imeIPrezime = req.body.imeIPrezime;
        let lozinka = req.body.lozinka;
        let adresa = req.body.adresa;
        let kontaktTelefon = req.body.kontaktTelefon;
        let imejl = req.body.imejl;
        let imagePath = req.body.imagePath;
        let tip = req.body.tip;

        KorisnikModel.updateOne({'korisnickoIme' : staroKorisnickoIme}, {$set : {'korisnickoIme' : korisnickoIme, 'imeIPrezime' : imeIPrezime, 'lozinka' :lozinka,
                        'adresa' : adresa, 'kontaktTelefon' : kontaktTelefon, 'imejl' : imejl, 'imagePath' : imagePath, 'tip' : tip}}, (err,resp) => {
                            if (err) console.log(err)
                            else {
                                KorisnikModel.findOne({'korisnickoIme' : korisnickoIme}, (err, respObj) => {
                                    if (err) console.log(err);
                                    else res.json(respObj);
                                })
                            }
                        })
    }

    dohvati = (req: express.Request, res: express.Response) => {
        
        KorisnikModel.find({'zahtev' : 'Z'}, (err, resp) => {
            if (err) console.log(err);
            else res.json(resp);
        })
    }


    dohvatiKorisnike = (req: express.Request, res: express.Response) => {
        KorisnikModel.find({'zahtev' : 'O', 'tip' : 'C'}, (err, resp) => {
            if (err) console.log(err);
            else res.json(resp);
        })
    }

    dohvatiKorisnika = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;
        KorisnikModel.find({'korisnickoIme' : korisnickoIme}, (err, resp) => {
            if (err) console.log(err);
            else res.json(resp);
        })
    }

    prihvatiKorisnika = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;
        KorisnikModel.updateOne({'korisnickoIme' : korisnickoIme}, {$set: {'zahtev' : "O"}}, (err, resp) => {
            if (err) console.log(err);
            else res.json({'poruka' : 'Zahtev za prihvatanje korisnika je prihvacen!'});
        })
    }

    odbaciKorisnika = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;

        KorisnikModel.deleteOne({'korisnickoIme' : korisnickoIme}, (err, resp) => {
            if (err) console.log(err)
            else res.json({'poruka' : 'Korisnik je odbijen'});
        })
    }

    zaduziKnjigu = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;
        let id = req.body.id;
        let naziv = req.body.naziv;
        let autori = req.body.autori;
        let imagePath = req.body.imagePath;

        let datumZaduzivanja = new Date();
        let datumVracanja = null;

        let zaduzenaKnjiga = {
            id: id,
            naziv: naziv,
            autori: autori,
            imagePath: imagePath,
            datumZaduzivanja: datumZaduzivanja,
            datumVracanja: datumVracanja
        }

        KorisnikModel.updateOne({'korisnickoIme' : korisnickoIme}, {$push : {'zaduzeneKnjige' : zaduzenaKnjiga, 'istorijaZaduzenja' : zaduzenaKnjiga}}, (err,resp)=>{
            if (err) console.log(err);
            else {
                KorisnikModel.findOne({'korisnickoIme' : korisnickoIme}, (err, kor) => {
                    if (err) console.log(err);
                    else res.json(kor);
                })
            }
        })
    }

    vratiKnjigu = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;
        let id = req.body.id;
        let naziv = req.body.naziv;
        let autori = req.body.autori;
        let imagePath = req.body.imagePath;
        let datumZaduzivanja = req.body.datumZaduzivanja;

        let datumVracanja2 = new Date();

        let zaduzenaKnjiga = {
            id: id,
            naziv: naziv,
            autori: autori,
            imagePath: imagePath,
            datumZaduzivanja: datumZaduzivanja,
            datumVracanja: null
        };
 

        KorisnikModel.updateOne({'korisnickoIme' : korisnickoIme}, {$set : {"istorijaZaduzenja.$[elem].datumVracanja" : datumVracanja2}}, {arrayFilters: [{
            "elem.id" : id
        }]}, (err, resp) => {
            if (err) console.log(err);
            else {
                console.log(resp);
                KorisnikModel.updateOne({'korisnickoIme' : korisnickoIme}, {$pull : {'zaduzeneKnjige' : zaduzenaKnjiga}}, (err, resp) => {
                    if (err) console.log(err);
                    else {
                        console.log('LUKA');
                        KorisnikModel.findOne({'korisnickoIme' : korisnickoIme}, (err, resp) => {
                            if (err) console.log(err)
                            else res.json(resp);
                        })
                    }
                })
            }
        })
    }
}