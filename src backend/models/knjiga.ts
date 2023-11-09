import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Knjiga = new Schema({
    id: {
        type: String
    },
    naziv: {
        type: String
    },
    autori: {
        type: String
    },
    zanrovi: {
        type: String
    },
    izdavac: {
        type: String
    },
    godina: {
        type: Date
    },
    jezik: {
        type: String
    },
    imagePath: {
        type: String
    },
    brojUzimanja: {
        type: String
    },
    naStanju: {
        type: String
    },
    zahtevao: {
        type: String
    },
    komentari: {
        type: [
            {tekst: String},
            {korisnickoIme: String},
            {datum: Date},
            {ocena: Number}
        ]
    },
    zaduzena: {
        type: String
    },
    rok: {
        type: String
    },
    prosecnaOcena: {
        type: String //Mozda problem
    }

})

export default mongoose.model("KnjigaModel", Knjiga, 'knjige');