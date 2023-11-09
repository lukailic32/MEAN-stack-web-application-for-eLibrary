import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Korisnik = new Schema({
    korisnickoIme: {
        type: String
    },
    lozinka: {
        type: String
    },
    imeIPrezime: {
        type: String
    },
    adresa: {
        type: String
    },
    kontaktTelefon: {
        type: Number
    },
    imejl: {
        type: String
    },
    tip: {
        type: String
    },
    imagePath: {
        type: String
    },
    zaduzeneKnjige: {
        type: [
            {id : String},
            {naziv: String},
            {autori: String},
            {imagePath: String},
            {datumZaduzivanja: Date},
            {datumVracanja: Date}
        ]
    },
    istorijaZaduzenja: {
        type: [
            {id : String},
            {naziv: String},
            {autori: String},
            {imagePath: String},
            {datumZaduzivanja: Date},
            {datumVracanja: Date}
        ]
    },
    zahtev: {
        type: String
    }

})

export default mongoose.model('KorisnikModel', Korisnik, 'korisnici')