'use strict';

const express = require('express');

const udRoute = express.Router();

const connection = require('../db');

udRoute.put('/user/:uid', function (req, res, next) {

    connection.execute("UPDATE users_tbl SET name = ?, tel = ? WHERE id = ?",
        [req.body.name, req.body.tel, req.params.uid])
        .then(() => {
            console.log('ok');
        }).catch((err) => {
            console.log(err);
        });

    res.status(200).send('Update Successfully');
});

udRoute.delete('/user/:uid', function (req, res, next) {
    connection.execute("DELETE FROM users_tbl WHERE id=?;",
        [req.params.uid])
        .then(() => {
            console.log('ok');
        }).catch((err) => {
            console.log(err);
        });
    res.end();//จบการทำงานของดาต้า
});

udRoute.use('/', function (req, res, next) {
    res.sendStatus(404);
})
module.exports = udRoute;