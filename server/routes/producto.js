const express = require('express');

const { verificarToken } = require('../middlewares/autenticacion');

let app = express();
let Producto = require('../models/producto');

// ==========================
// Obtener todo los productos
// ==========================

app.get('/productos', (req, res) => {
    // trae todo los productos
    // populate: usuario categoria
    // paginado

    let desde = req.query.desde || 0;
    desde = Number(desde);


    Producto.find({ disponible: true })
        .skip(desde)
        .limit(5)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            };

            res.json({
                ok: true,
                productos: productoDB
            });
        });

});

// ==========================
// Obtener un producto po ID
// ==========================
app.get('/productos/:id', (req, res) => {
    // populate: usuario categoria
    // paginado
    let id = req.params.id;

    Producto.findById(id)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'nombre')
        .exec((err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            };

            if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'El ID no existe'
                    }
                });
            };

            res.json({
                ok: true,
                producto: productoDB
            });

        });
});

app.get('/productos/buscar/:termino', (req, res) => {

    let termino = req.params.termino;

    let regex = new RegExp(termino, 'i');

    Producto.find({ nombre: regex })
        .populate('categoria', 'nombre')
        .exec((err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            };

            res.json({
                ok: true,
                producto: productoDB
            });
        });

});

// ==========================
// Crear un nuevo producto
// ==========================
app.post('/productos', verificarToken, (req, res) => {
    // grabar el usuario
    // grabar una categoria del listado
    let body = req.body;
    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
        usuario: req.usuario._id
    });

    producto.save((err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };

        res.status(201).json({
            ok: true,
            producto: productoDB
        });

    });
});

// ==========================
// Actualizar un producto
// ==========================
app.put('/productos/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;

    Producto.findById(id, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no existe'
                }
            });
        };

        productoDB.nombre = body.nombre
        productoDB.categoria = body.categoria
        productoDB.descripcion = body.descripcion
        productoDB.disponible = body.disponible
        productoDB.precioUni = body.precioUni

        productoDB.save((err, productoGuardado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            };

            res.json({
                ok: true,
                producto: productoGuardado
            })
        });
    });

});

// ==========================
// Borrar producto
// ==========================
app.delete('/productos/:id', (req, res) => {

    let id = req.params.id;

    Producto.findById(id, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'EL ID no es valido'
                }
            });
        };

        productoDB.disponible = false;

        productoDB.save((err, productoBorrado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            };

            res.json({
                ok: true,
                producto: productoBorrado,
                message: 'Producto Borrado exitosamente'
            })
        });
    });
});

module.exports = app;