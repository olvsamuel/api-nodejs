const express = require('express');
const router = express.Router();

// for the teste, run on localhost:4000/api/people
router.get('/', async (req,res)=>{
    res.send('people route here');
});

// post - inserting a new people on SQL Server
// route is: /api/people/post
// send a json object to put on the db
router.post('/post', async (req,res) => {
    // if has nothing on the body, send 400
    if (!req.body) res.sendStatus(400);

    let name = req.body.name;
    let age = req.body.age;

    try {

        // the sql command
        let sql = `INSERT People (name, age) VALUES (
            '${name}', ${age}
        )`;

        // executing the sql command
        r1 = await global.conn.request().query(sql);

        // returning HTTP 200
        res.sendStatus(200);
        
    } catch (error) {
        // you can treat the error here, sending a status
        // or send the error on the catch.
        // res.send(error);

        res.sendStatus(400);
    }
    
});

// getting a people with the id
// route is: /api/people/get/{id}
// example: /api/people/get/1
router.get('/get/:id', async (req, res) => {
    try {
        // if has nothing on the params, send 400
        if (!req.params) res.sendStatus(400);

        // here, take the id from params
        let id = req.params.id;

        // the sql command
        let sql = `SELECT id, name, age FROM People WHERE id = ${id}`;

        // executing the sql command
        r1 = await global.conn.request().query(sql);

        // sending a json with the result of the sql query 
        res.json(r1.recordset);
    } catch (error) {
        // you can treat the error here, sending a status
        // or send the error on the catch.
        // res.send(error);

        res.sendStatus(400);
    }
});

// getting all peoples
// route is: /api/people/get
router.get('/get', async (req, res) => {
    try {
        // the sql command
        let sql = `SELECT id, name, age FROM People `;

        // executing the sql command
        r1 = await global.conn.request().query(sql);

        // returning the recordset json
        res.json(r1.recordset);
    } catch (error) {
        // you can treat the error here, sending a status
        // or send the error on the catch.
        // res.send(error);

        res.sendStatus(400);
    }
});

// update people. by id
// route is: /api/people/put/{id}
// example /api/people/put/1
router.put('/put/:id', async (req, res) => {
    try {
        // if has nothing on the params, send 400
        if (!req.params) res.sendStatus(400);
        
        // here, take the id from params
        let id = req.params.id;

        // here, take the values from body
        let name = req.body.name;
        let age = req.body.age;

        // the sql command
        let sql = `UPDATE Pessoa SET name = '${name}', 
        age = ${age} WHERE idPeople = ${id}`;

        // executing the sql command
        r1 = await global.conn.request().query(sql);

        // returning HTTP 200 and the Recordset
        res.status(200).json(r1.recordset);
    } catch (error) {
        // you can treat the error here, sending a status
        // or send the error on the catch.
        // res.send(error);

        res.sendStatus(400);
    }
});

// delete people. by id
// route is: /api/people/delete/{id}
// example /api/people/delete/1
router.delete('/delete/:id', async (req, res) => {
    try {
        // if has nothing on the params, send 400
        if (!req.params) res.sendStatus(400);

        // here, take the id from params
        let id = req.params.id;

        // the sql command
        let sql = `DELETE Pessoa WHERE idPeople = ${id}`;

        // executing the sql command
        r1 = await global.conn.request().query(sql);

        // returning HTTP 200 and the Recordset
        res.status(200).json(r1.recordset);        
    } catch (error) {
        // you can treat the error here, sending a status
        // or send the error on the catch.
        // res.send(error);

        res.sendStatus(400);
    }
});

module.exports = router;