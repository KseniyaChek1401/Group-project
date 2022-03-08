const express = require('express');
const app = express();
const mysql = require('mysql');

const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'henkilorekisteri'
});

app.post('/create', (req, res) => {
    const nimi = req.body.nimi;
    const titteli = req.body.titteli;
    const sahkoposti = req.body.sahkoposti;
    const puhelin = req.body.puhelinnumero;

    db.query("INSERT INTO henkilot (nimi, puhelinnumero, sahkopostiosoite, titteli) values (?,?,?,?)", 
    [nimi, puhelin, sahkoposti, titteli], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send("Tiedot lisätty");
        }
    });
});

app.get('/employees', (req, res) => {

    db.query("SELECT * FROM henkilot", (err, result) => {
        if (err) {
            console.log(err)
        } else {
           res.send(result); 
        }
    });

});

app.put('/update', (req, res) => {
    const id = req.body.id;
    const titteli = req.body.titteli;
   
    db.query("UPDATE henkilot SET titteli = ? WHERE id = ?", [titteli, id], (err, result) => {
        if (err) {
            console.log(err);
        }
        else
        {
            res.send(result);
        }
    });
});

app.listen(3001, () => {
    console.log('Serveri toimii');
})