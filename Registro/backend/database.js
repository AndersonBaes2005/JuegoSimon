/*require('dotenv').config({ path: './backend/.env' });

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const path = require('path');

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos desde "frontend"
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

// Registrar usuario con contraseña encriptada
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Nombre de usuario y contraseña son requeridos' });
    }

    try {
        // Verificar si el usuario ya existe
        const [rows] = await pool.query('SELECT * FROM usersjuego WHERE nombre = ?', [username]);
        if (rows.length > 0) {
            return res.json({ success: false, message: 'El nombre de usuario ya existe' });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar el nuevo usuario con contraseña encriptada
        await pool.query('INSERT INTO usersjuego (nombre, password) VALUES (?, ?)', [username, hashedPassword]);

        res.json({ success: true, message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ success: false, message: 'Error al registrar el usuario' });
    }
});

// Login con verificación de contraseña
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Nombre de usuario y contraseña son requeridos' });
    }

    try {
        // Buscar usuario en la base de datos
        const [rows] = await pool.query('SELECT * FROM usersjuego WHERE nombre = ?', [username]);

        if (rows.length === 0) {
            return res.json({ success: false, message: 'El usuario no existe. Regístrate primero.' });
        }

        // Comparar la contraseña ingresada con la almacenada
        const user = rows[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
        }

        res.json({ success: true, message: 'Inicio de sesión exitoso' });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ success: false, message: 'Error al iniciar sesión' });
    }
});

// Ruta para servir el archivo de registro
app.get('/registro', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'RegisterUsuario.html'));
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en https://cl2blb9z-4000.use.devtunnels.ms/registro`);
});
*/