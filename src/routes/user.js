const express = require('express');
const userSchema = require('../models/user');

const router = express.Router();

//crear usuario
router.post('/users', (req, res) => {
    const user = userSchema(req.body);
    user.save().then((data) => res.json(data)).catch((error) => res.json({message: error}));
});

// obtener usuarios 
router.get('/users', (req, res) => {
    userSchema.find().then((data) => res.json(data)).catch((error) => res.json({message: error}));
});

// obtener un usuarios 
router.get('/users/:id', (req, res) => {
    const { id } = req.params;
    userSchema.findById(id).then((data) => res.json(data)).catch((error) => res.json({message: error}));
});

// actualizar un usuario
router.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const {nombre, email, contraseña} = req.body;
    userSchema.updateOne({ _id: id },{ $set: {nombre, email, contraseña}}).then((data) => res.json(data)).catch((error) => res.json({message: error}));
});
// eliminar usuraio
router.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    userSchema.deleteOne({ _id: id }) // Cambiado a deleteOne
        .then(() => res.json({ message: 'Usuario eliminado correctamente' }))
        .catch(error => res.status(500).json({ message: error.message }));
});

module.exports = router;