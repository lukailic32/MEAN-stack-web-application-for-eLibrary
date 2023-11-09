import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import korisnikRouter from './routers/korisnik.router'
import path from 'path';
import KnjigaRouter from './routers/knjiga.router';

const app = express();
app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join("./images")));

mongoose.connect('mongodb://localhost:27017/projekat');
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('DB connected')
})    

const router = express.Router();
router.use('/korisnici', korisnikRouter);
router.use('/knjige', KnjigaRouter);

app.use('/', router)
app.listen(4000, () => console.log(`Express server running on port 4000`));