const cors = require('cors');
const express = require('express');
const mysql = require('mysql2');

const app = express();

const PORT = 3000;

let database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'harry_potter'
});


app.use(express.json())
app.use(cors());

app.get('/', (req, res) => {
    database.query('SELECT * from libro', (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al conectar con la base de datos' })
        } else {
            res.json(result)
        }
    })
});

app.post('/', (req, res) => {
    database.query('UPDATE libro set cantidad = cantidad - ? where id = ?', (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al conectar con la base de datos' })
        } else {
            res.json(result)
        }
    })
})

app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});