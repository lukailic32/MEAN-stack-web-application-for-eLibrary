import express from 'express'
import KnjigaModel from '../models/knjiga'

export class KnjigaKontroler{

    registracijaKnjigeSaSlikom = (req: express.Request, res: express.Response) => {
        let naziv = req.body.naziv;
        let autori = req.body.autori;
        let zanrovi = req.body.zanrovi;
        let izdavac = req.body.izdavac;
        let godina = req.body.godina;
        let jezik = req.body.jezik;
        let brojUzimanja = req.body.brojUzimanja;
        let zahtevao = req.body.zahtevao;
        
        const url = req.protocol + "://" + req.get("host");
        let imagePath = url + "/images/" + req.file.filename;
        
        let id = req.body.id;

        let knjiga = new KnjigaModel();

        knjiga.naziv = naziv;
        knjiga.autori = autori;
        knjiga.zanrovi = zanrovi;
        knjiga.izdavac = izdavac;
        knjiga.godina = godina;
        knjiga.jezik = jezik;
        knjiga.imagePath = imagePath;
        knjiga.id = id;
        knjiga.brojUzimanja = brojUzimanja;
        knjiga.zahtevao = zahtevao
        knjiga.naStanju = "1";
        knjiga.zaduzena = 0;
        knjiga.rok = "14";
        //knjiga.komentari = null;
        knjiga.prosecnaOcena = "0";

        knjiga.save((err, resp) => {
            if (err) console.log(err);
            else console.log('Dodat korisnik');
        })
    }

    registracijaKnjigeBezSlike = (req: express.Request, res: express.Response) => {
        let naziv = req.body.naziv;
        let autori = req.body.autori;
        let zanrovi = req.body.zanrovi;
        let izdavac = req.body.izdavac;
        let godina = req.body.godina;
        let jezik = req.body.jezik;
        let brojUzimanja = req.body.brojUzimanja;
        let zahtevao = req.body.zahtevao;
        let id = req.body.id;

        let knjiga = new KnjigaModel();

        knjiga.naziv = naziv;
        knjiga.autori = autori;
        knjiga.zanrovi = zanrovi;
        knjiga.izdavac = izdavac;
        knjiga.godina = godina;
        knjiga.jezik = jezik;
        knjiga.brojUzimanja = brojUzimanja;
        knjiga.zahtevao = zahtevao;
        knjiga.imagePath = "http://localhost:4000/images/BOOK.png";
        knjiga.id = id;
        knjiga.naStanju = "1";
        knjiga.zaduzena = 0;
        knjiga.rok = "14";
        //knjiga.komentari = null;
        knjiga.prosecnaOcena = "0";

        knjiga.save((err, resp) => {
            if (err) console.log(err);
            else console.log('Dodat korisnik');
        })
    }

    dohvatiKnjige = (req: express.Request, res: express.Response) => {
        KnjigaModel.find({'brojUzimanja' : {$not: {$regex : "-1"}}}, (err, knjige) =>{
            if (err) console.log(err);
            else res.json(knjige);
        })
    }

    dohvatiZahtevaneKnjige = (req: express.Request, res: express.Response) => {
        KnjigaModel.find({"brojUzimanja" : "-1"}, (err, knjige) =>{
            if (err) console.log(err);
            else res.json(knjige);
        })
    }

    pretragaNaziv = (req: express.Request, res: express.Response) => {
        let naziv = req.body.naziv;
        KnjigaModel.find({'naziv' : {$regex : naziv, $options: "i"}, 'brojUzimanja' : {$not: {$regex : "-1"}}}, (err, knjige) => {
            if (err) console.log(err);
            else res.json(knjige);
        })
    }

    pretragaAutor = (req: express.Request, res: express.Response) => {
        let autori = req.body.autori;
        KnjigaModel.find({'autori' : {$regex: autori, $options: "i"}, 'brojUzimanja' : {$not: {$regex : "-1"}}}, (err, knjige) => {
            if (err) console.log(err);
            else res.json(knjige);
        })
    }

    dohvatiKnjigu = (req: express.Request, res: express.Response) => {
        let id = req.body.id;
        KnjigaModel.findOne({'id' : id, 'brojUzimanja' : {$not: {$regex : "-1"}}}, (err, knjiga) => {
            if (err) console.log(err);
            else res.json(knjiga);
        })
    }

    prihvati = (req: express.Request, res: express.Response) => {
        let id = req.body.id;
        KnjigaModel.updateOne({'id': id}, {$set : {'brojUzimanja' : "0"}}, (err, resp) => {
            if (err) console.log(err);
            else res.json({'poruka' : 'Zahtev za dodavanje knjige je prihvacen!'});
        })
    }

    odbaci = (req: express.Request, res: express.Response) => {
        let id = req.body.id;

        KnjigaModel.deleteOne({'id' : id}, (err, resp) => {
            if (err) console.log(err);
            else res.json({'poruka' : 'Uspesno obrisana knjiga!'});
        })
    }

    azurirajSlika = (req: express.Request, res: express.Response) => {
        let id = req.body.id;
        let naziv = req.body.naziv;
        let autori = req.body.autori;
        let zanrovi = req.body.zanrovi;
        let izdavac = req.body.izdavac;
        let jezik = req.body.jezik;
        let naStanju = req.body.naStanju;
        
        
        const url = req.protocol + "://" + req.get("host");
        let imagePath = url + "/images/" + req.file.filename;

        KnjigaModel.updateOne({'id' : id}, { $set : {'naziv' : naziv,'autori' : autori, 'zanrovi' : zanrovi, 'izdavac' : izdavac, 'jezik' : jezik, 'imagePath' : imagePath,
                'naStanju' : naStanju}}, (err, resp) => {
                    if (err) console.log(err);
                    else KnjigaModel.findOne({'id' : id}, (err, knjiga) => {
                        if (err) console.log(err);
                        else res.json(knjiga);
                    })    
                })
    }

    azuriraj = (req: express.Request, res: express.Response) =>{
        let id = req.body.id;
        let naziv = req.body.naziv;
        let autori = req.body.autori;
        let zanrovi = req.body.zanrovi;
        let izdavac = req.body.izdavac;
        let jezik = req.body.jezik;
        let naStanju = req.body.naStanju;

        KnjigaModel.updateOne({'id' : id}, { $set : {'naziv' : naziv,'autori' : autori, 'zanrovi' : zanrovi, 'izdavac' : izdavac, 'jezik' : jezik,
                'naStanju' : naStanju}}, (err, resp) => {
                    if (err) console.log(err);
                    else KnjigaModel.findOne({'id' : id}, (err, knjiga) => {
                        if (err) console.log(err);
                        else res.json(knjiga);
                    })
                })
    }

    azurirajK = (req: express.Request, res: express.Response) =>{
        let id = req.body.id;
        let naziv = req.body.naziv;
        let autori = req.body.autori;
        let zanrovi = req.body.zanrovi;
        let izdavac = req.body.izdavac;
        let jezik = req.body.jezik;
        let naStanju = req.body.naStanju;
        let rok = req.body.rok;

        KnjigaModel.updateOne({'id' : id}, { $set : {'naziv' : naziv,'autori' : autori, 'zanrovi' : zanrovi, 'izdavac' : izdavac, 'jezik' : jezik,
                'naStanju' : naStanju, 'rok' : rok}}, (err, resp) => {
                    if (err) console.log(err);
                    else KnjigaModel.findOne({'id' : id}, (err, knjiga) => {
                        if (err) console.log(err);
                        else res.json(knjiga);
                    })
                })
    }

    zaduziKnjigu = (req: express.Request, res: express.Response) => {
        let id = req.body.id;
        let naStanju = parseInt(req.body.naStanju);
        let zaduzena = parseInt(req.body.zaduzena);
        let brojUzimanja = parseInt(req.body.brojUzimanja);
        brojUzimanja++;
        naStanju--;
        zaduzena--;
        brojUzimanja.toString();
        naStanju.toString();
        zaduzena.toString();
        KnjigaModel.updateOne({'id' : id}, {$set : {'naStanju' : naStanju, 'zaduzena' : zaduzena, 'brojUzimanja' : brojUzimanja}}, (err, resp) => {
            console.log(naStanju);
            console.log(brojUzimanja);
            console.log(zaduzena);
            if (err) console.log(err);
            else {
                KnjigaModel.findOne({'id' : id}, (err, knjiga) => {
                    if (err) console.log(err);
                    else res.json(knjiga);
                })
            }
        })
    }

    vratiKnjigu = (req: express.Request, res: express.Response) => {
        let id = req.body.id;
        let naStanju = parseInt(req.body.naStanju);
        let zaduzena = parseInt(req.body.zaduzena);
        naStanju++;
        zaduzena++;
        naStanju.toString();
        zaduzena.toString();
        KnjigaModel.updateOne({'id' : id}, {$set : {'naStanju' : naStanju, 'zaduzena' : zaduzena}}, (err, resp) => {
            if (err) console.log(err);
            else {
                KnjigaModel.findOne({'id' : id}, (err, knjiga) => {
                    if (err) console.log(err);
                    else res.json(knjiga);
                })
            }
        })
    }
}