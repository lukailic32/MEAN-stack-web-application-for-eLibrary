import { Komentar } from "./komentar";

export class Knjiga {
    id: string;
    naziv: string;
    autori: string;
    zanrovi: string;
    izdavac: string;
    godina: Date;
    jezik: string;
    imagePath: string;
    brojUzimanja: string;
    naStanju: string;
    komentari: Array<Komentar>;
    zahtevao: string;
    zaduzena: number;
    rok: number;
    prosecnaOcena: string;
}