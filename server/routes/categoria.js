const express = require('express');

let { verificarToken, verificarAdminRole } = require('../middlewares/autenticacion');

let app = express();

let Categoria = require('../models/categoria');

app.get('/categoria', verificarToken, (req, res) => {
    Categoria.find({})
        .sort('descripcion')
        .populate('usuario')
        .exec((err, categoriasDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            };

            return res.json({
                ok: true,
                categorias: categoriasDB
            });
        });
});

app.get('/categoria/:id', verificarToken, (req, res) => {
    let id = req.params.id;

    Categoria.findById(id, (err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no es valido'
                }
            });
        };

        return res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});


app.post('/categoria', verificarToken, (req, res) => {

    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            categoria: categoriaDB
        });

    });

});

app.put('/categoria/:id', verificarToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let descCategoria = {
        descripcion: body.descripcion
    }

    Categoria.findByIdAndUpdate(id, descCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });

});

// ==========================
// Delete
// ==========================
app.delete('/categoria/:id', [verificarToken, verificarAdminRole], (req, res) => {
    // Solo un administrador puede borrar categorias
    // Categoria.findByIdAndRemove
    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaDB) => {
        if (err) {
            return res.status().json({
                ok: false,
                err
            });
        };

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            });
        };

        res.json({
            ok: true,
            message: 'Categoria Borrada'
        })
    });
});

module.exports = app;