const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config(); // Cargar las variables de entorno

const app = express();
const port = 3000;

// Configuración de nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Middleware para procesar los datos del formulario
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para manejar el envío del formulario
app.post('/send-email', (req, res) => {
    const { name, phone, email, subject, message } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.RECEIVER_EMAIL,
        subject: `${subject}`,
        text: `Nombre: ${name}\nTeléfono: ${phone}\nCorreo: ${email}\nMensaje: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error al enviar el correo:', error);
            return res.status(500).json({ error: 'No se pudo enviar el correo' });
        }
        res.status(200).json({ success: 'Correo enviado correctamente' });
    });
});

// Servir el archivo HTML desde el directorio público
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
});
