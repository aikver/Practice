'use strict';

const express = require('express');
const crypto = require('crypto');
const wrRoute = express.Router();
const connection = require('../db');

const currentDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
wrRoute.post('/users', function (req, res, next) {
    let mypass = crypto.createHash('md5').update(req.body.password).digest('hex');

    connection.execute(`INSERT INTO users_tbl
     (id,name, tel,date,mate, username,surname, password, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?,?,?);`, [req.body.id, req.body.name, req.body.tel, req.body.date, req.body.mate, req.body.username, req.body.surname, mypass, currentDateTime, currentDateTime])
        .then(() => {
            console.log('ok');
            res.status(201).send('registation Successful!')
        }).catch((err) => {
            console.log(err);
            res.end();
        });

});


//-----------------------------read--------------------------------------
wrRoute.get('/user', function (req, res, next) {
    connection.execute('SELECT * FROM Users_tbl;')
        .then((result) => {
            var rawData = result[0];
            if (rawData.length === 0) {
                res.send(JSON.stringify("no data"));
            } else {
                res.send(JSON.stringify(rawData));
            }
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
            res.end();
        });
});

wrRoute.get('/check', function (req, res, next) {
    let mypass = crypto.createHash('md5').update(req.body.password).digest("hex");
    connection.execute('SELECT * FROM users_tbl WHERE username=? AND password=?;',
        [req.body.username, mypass])
        .then((result) => {
            var data = result[0];
            console.log(data);
            if (data.length === 0) {
                res.sendStatus(400);
            } else {
                res.sendStatus(200);
            }
        }).catch((err) => {
            console.log(err);
            res.sendStatus(404);
        });

});

wrRoute.use('/', function (req, res, next) {
    res.sendStatus(404);
});

module.exports = wrRoute;
//exports module(router) จำเป็นมาก