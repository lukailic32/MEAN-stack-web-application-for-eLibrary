import express from 'express';
import { KorisnikKontroler } from '../controllers/korisnik.controllers';
import multer from 'multer';

const korisnikRouter = express.Router();

const MIME_TYPE_MAP = {  
    'image/png': 'png',  
    'image/jpeg': 'jpg',  
    'image/jpg': 'jpg'  
};

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid Mime Type");  
        if(isValid){  
            error = null;
        }  
        cb(error, "./images");
    },

    filename:(req,file,cb) => {
        //const name = file.originalname.toLowerCase().split(' ').join('_');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, req.body.korisnickoIme + '.' + ext);
    }
});



korisnikRouter.route('/prijava').post(
    (req,res) => new KorisnikKontroler().prijava(req,res)
)

korisnikRouter.route('/registracijaProvera').post(
    (req,res) => new KorisnikKontroler().registracijaProvera(req,res)
)

korisnikRouter.route('/registracijaSaSlikom').post(multer({storage : storage}).single("image"),
    (req,res) => new KorisnikKontroler().registracijaSaSlikom(req,res)
)

korisnikRouter.route('/promenaLozinke').post(
    (req,res) => new KorisnikKontroler().promeni(req,res)
)

korisnikRouter.route('/registracijaBezSlike').post(
    (req, res) => new KorisnikKontroler().registracijaBezSlike(req, res)
)

korisnikRouter.route('/azuriraj').post(
    (req, res) => new KorisnikKontroler().azuriraj(req, res)
)

korisnikRouter.route('/dohvati').get(
    (req, res) => new KorisnikKontroler().dohvati(req, res)
)

korisnikRouter.route('/zaduziKnjigu').post(
    (req, res) => new KorisnikKontroler().zaduziKnjigu(req, res)
)

korisnikRouter.route('/vratiKnjigu').post(
    (req, res) => new KorisnikKontroler().vratiKnjigu(req, res)
)

korisnikRouter.route('/prihvatiKorisnika').post(
    (req, res) => new KorisnikKontroler().prihvatiKorisnika(req, res)
)

korisnikRouter.route('/odbaciKorisnika').post(
    (req, res) => new KorisnikKontroler().odbaciKorisnika(req, res)
)

korisnikRouter.route('/dohvatiKorisnike').get(
    (req, res) => new KorisnikKontroler().dohvatiKorisnike(req, res)
)

korisnikRouter.route('/dohvatiKorisnika').post(
    (req, res) => new KorisnikKontroler().dohvatiKorisnika(req, res)
)
export default korisnikRouter;