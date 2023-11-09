import express from 'express'
import multer from "multer";
import { KnjigaKontroler } from '../controllers/knjiga.controller';

const KnjigaRouter = express.Router();

const MIME_TYPE_MAP = {  
    'image/png': 'png',  
    'image/jpeg': 'jpg',  
    'image/jpg': 'jpg'  
};

const storage2 = multer.diskStorage({
    destination:(req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid Mime Type");  
        if(isValid){  
            error = null;
        }  
        cb(error, "./images");
    },

    filename:(req,file,cb) => {
        
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, req.body.naziv + '.' + ext);
    }
});

KnjigaRouter.route('/registracijaKnjigeSaSlikom').post(multer({storage : storage2}).single("image"),
    (req, res) => new KnjigaKontroler().registracijaKnjigeSaSlikom(req,res)
)

KnjigaRouter.route('/dohvatiKnjige').get(
    (req, res) => new KnjigaKontroler().dohvatiKnjige(req,res)
)

KnjigaRouter.route('/registracijaKnjigeBezSlike').post(
    (req, res) => new KnjigaKontroler().registracijaKnjigeBezSlike(req, res)
)

KnjigaRouter.route('/pretragaNaziv').post(
    (req, res) => new KnjigaKontroler().pretragaNaziv(req, res)
)

KnjigaRouter.route('/pretragaAutor').post(
    (req, res) => new KnjigaKontroler().pretragaAutor(req, res)
)

KnjigaRouter.route('/dohvatiKnjigu').post(
    (req, res) => new KnjigaKontroler().dohvatiKnjigu(req, res)
)

KnjigaRouter.route('/dohvatiZahtevaneKnjige').get(
    (req, res) => new KnjigaKontroler().dohvatiZahtevaneKnjige(req, res)
)

KnjigaRouter.route('/prihvati').post(
    (req, res) => new KnjigaKontroler().prihvati(req, res)
)

KnjigaRouter.route('/odbaci').post(
    (req, res) => new KnjigaKontroler().odbaci(req, res)
)

KnjigaRouter.route('/azurirajSlika').post(multer({storage : storage2}).single("image"),
    (req, res) => new KnjigaKontroler().azurirajSlika(req,res)
)

KnjigaRouter.route('/azuriraj').post(
    (req, res) => new KnjigaKontroler().azuriraj(req, res)
)

KnjigaRouter.route('/azurirajK').post(
    (req, res) => new KnjigaKontroler().azurirajK(req, res)
)

KnjigaRouter.route('/zaduziKnjigu').post(
    (req, res) => new KnjigaKontroler().zaduziKnjigu(req, res)
)

KnjigaRouter.route('/vratiKnjigu').post(
    (req, res) => new KnjigaKontroler().vratiKnjigu(req, res)
)

export default KnjigaRouter;