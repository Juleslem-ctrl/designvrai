const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();
const port = 3000;

const upload = multer({ dest: 'uploads/' });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('.'));

app.post('/submit', upload.single('photo'), (req, res) => {
  const formData = {
    prenom: req.body.prenom,
    nom: req.body.nom,
    accroche: req.body.accroche,
    taille: req.body.taille,
    date_naissance: req.body.date_naissance,
    classe: req.body.classe,
    photo: req.file ? req.file.filename : null
  };

  // Charger les anciennes données
  let data = [];
  if (fs.existsSync('data.json')) {
    data = JSON.parse(fs.readFileSync('data.json'));
  }

  // Ajouter la nouvelle entrée
  data.push(formData);

  // Réécrire le fichier JSON
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));

  res.send('Données enregistrées !');
});

app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});
