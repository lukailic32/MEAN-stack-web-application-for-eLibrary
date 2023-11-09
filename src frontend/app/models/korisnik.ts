import { ZaduzenaKnjiga } from "./zaduzenaKnjiga";

export class Korisnik {
    korisnickoIme: string;
    lozinka: string;
    imeIPrezime: string;
    adresa: string;
    kontaktTelefon: number;
    imejl: string;
    tip: string;
    imagePath: string;
    zaduzeneKnjige: Array<ZaduzenaKnjiga>;
    istorijaZaduzenja: Array<ZaduzenaKnjiga>;
    zahtev: string;
}