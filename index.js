const express = require('express');
const body_parser = require('body-parser');
const mongodb = require('mongodb');
const app = express();
const PORT = 3000;
const path = require('path');

app.set('view engine', 'ejs');


//look at Unit 19 day 4
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

let db_handler;
const DB_URL = 'mongodb://localhost:27017';
const DB_NAME = 'community'
const COLLECTION_NAME = 'art';

app.listen(PORT, () => {
    console.log('Server started on 3000');
});

//homepage should be rendered 
app.get('/', (req, res) => {
    res.render('pages/index');
    res.send('Personal Webpage Project');
});
// app.get('/', (req,res) => { res.render('index')}

app.get('/index.ejs', (req, res)=>{
    res.render('pages/index');
});

app.get('/aboutPage.ejs', (req, res)=>{
    res.render('pages/aboutPage');
});

app.get('/commentsUploads.ejs', (req, res)=>{
    res.render('pages/commentsUploads');
});

app.get('/contactPage.ejs', (req, res)=>{
    res.render('pages/contactPage');
});

app.get('/galleryPage.ejs', (req, res)=>{
    res.render('pages/galleryPage');
});

app.get('/mapPage.ejs', (req, res)=>{
    res.render('pages/mapPage');
});