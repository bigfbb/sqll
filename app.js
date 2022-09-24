const express = require('express');
const mysql = require('mysql2');
const app = express()
const cors = require('cors')
app.listen('4500', () => {
    console.log('server listeing on port 3306')
});

app.use(cors({
    origin : 'http://127.0.0.1:5501'
}));


const dbconnection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '1234',
    database : 'music_db'
});

dbconnection.connect((error) => {
    if (error) {
        throw error;
    }
    console.log('my sql connection established')
});

//Create 
app.get('/create', (request, response) => {
    let sql = 'CREATE DATABASE IF NOT EXISTS defaultnewdatabase;';
    dbconnection.query(sql, (error, result) => {
        if (error) throw error;
        console.log(result);
        response.send('Database created!');
    });
});



app.get('/insert', (request, response) => {
    let sql = 'INSERT INTO songs VALUES(' + 
    request.query.id + ',' + '"'+
    request.query.song_name + '"," ' + 
    request.query.artist_name + '"," ' +
    request.query.album_name + '");';
    // Get values from the url with request.query.<what you gave the value for name>.
    // Sending in http://localhost:4500/insert?id=4&song_name=Love&artist_name=Adele&album_name=nice
    // becomes
    // INSERT INTO customer VALUES (DEFAULT, "Love", 54, 3200);
    dbconnection.query(sql, (error, result) => {
        if (error) throw error;
        console.log(result);
        response.send('song added!');
    });
});


//Read
app.get('/get', (req, response) => {
    let sql = 'SELECT * FROM music_db.artists;';
    dbconnection.query(sql, (error, result) => {
        if (error) throw error;
        console.log(result);
        response.send(result);
        result.forEach(element => {
            console.log(element.artit_name);
        });
    });
});

//Update
app.get("/update", (request, response) =>
{
    let sql = `UPDATE songs SET album_name="The Best" WHERE id = 1;`
    dbconnection.query(sql,(err, res) =>
    {
        if (err) throw err;
        console.log(res);
        response.send(res);
    })
});

//DELETE
app.get("/delete", (request, response) =>
{
    let sql = "DELETE FROM songs WHERE id = 2;"
    dbconnection.query(sql,(err, res) =>
    {
        if (err) throw err;
        console.log(res);
        response.send(res);
    })
});