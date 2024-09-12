// api/send-email.js

const nodemailer = require('nodemailer');
require('dotenv').config(); // Cargar las variables de entorno

// Configuración de nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const { name, phone, email, subject, message } = req.body;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.RECEIVER_EMAIL,
            subject: `${subject}`,
            text: `Nombre: ${name}\nTeléfono: ${phone}\nCorreo: ${email}\nMensaje: ${message}`
        };

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ success: 'Correo enviado correctamente' });
        } catch (error) {
            console.error('Error al enviar el correo:', error);
            res.status(500).json({ error: 'No se pudo enviar el correo' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Método ${req.method} no permitido`);
    }
};
