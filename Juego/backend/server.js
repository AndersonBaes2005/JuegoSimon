require('dotenv').config({ path: './backend/.env' }); // Asegúrate de que esto esté al principio de tu archivo

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware para parsear JSON y URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta "frontend"
app.use(express.static(path.join(__dirname, '../frontend')));

// Conexión a la base de datos
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}).promise();

// Ruta para actualizar el nivel y los puntos del usuario
app.post('/actualizar-puntaje', async (req, res) => {
    const { username, nivel, puntos } = req.body;

    if (!username || !nivel || !puntos) {
        return res.status(400).json({ success: false, message: 'Datos incompletos' });
    }

    try {
        // Actualizar el nivel y los puntos del usuario
        await pool.query('UPDATE usersjuego SET nivel = ?, puntos = ? WHERE nombre = ?', [nivel, puntos, username]);

        res.json({ success: true, message: 'Puntaje actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar el puntaje:', error);
        res.status(500).json({ success: false, message: 'Error al actualizar el puntaje' });
    }
});
// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en https://cl2blb9z-5000.use.devtunnels.ms/`);
});