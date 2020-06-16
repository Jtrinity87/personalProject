const express = require('express');
const body_parser = require('body-parser');
const mongodb = require('mongodb');
const app = express();
const PORT = process.env.PORT || 3003;
const path = require('path');
const dotenv = require('dotenv').config();

let mongoClient = mongodb.MongoClient;


app.set('view engine', 'ejs');


app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

let db_handler;
const DB_URL = process.env.DB_URL;
const DB_NAME = process.env.DB_NAME;
const COLLECTION_NAME = process.env.COLLECTION_NAME;
const COLLECTION_CONTACTS = process.env.COLLECTION_CONTACTS;

app.listen(PORT, () => {
    console.log('Server started on 3003');
    mongoClient.connect(DB_URL, (err, db) => {
        if (err) {
            console.log(err);
        } else {
            console.log('connected to database');
            db_handler = db.db(DB_NAME);
    
        }
    });

});

app.get('/', (req, res) => {
    res.render('pages/index');
    res.send('Personal Webpage Project');
});

app.get('/index', (req, res) => {
    res.render('pages/index');
});

app.get('/aboutPage', (req, res) => {
    res.render('pages/aboutPage');
});

app.get('/contactPage', (req, res) => {
    res.render('pages/contactPage');
});


app.get('/galleryPage', (req, res) => {   
    console.log(my_object);
    db_handler.collection(COLLECTION_NAME).find({}).toArray((err, result) => {  
      if (err) {   
          console.log(err);
       } else {
res.render('pages/galleryPage', { 
  'allDetails': result 
          })
       }
    })
});


app.get('/createPage', (req, res) => {
    console.log("user is here /createPage")
    res.render('pages/createPage');
});

app.get('/allDetails', (req, res) => {
    db_handler.collection(COLLECTION_NAME).find({}).toArray((err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.render('pages/allDetails', {
                'allDetails': result
            });
        }
    });
});
let my_object;
app.post('/createPage', (req, res) => {
    const form_data = req.body;
    console.log(form_data);
    const artName = form_data['artName'];
    const address = form_data['address'];
    const link = form_data['link'];

    my_object = {
        "artName": artName,
        "address": address,
        "link": link

    }
    db_handler.collection(COLLECTION_NAME).insertOne(my_object, (err, result) => {
        if (err) {
            console.log("Error: " + err);
        }
        else {
            console.log("One Entry Added");
            // res.render('/allDetails');
        }
    });
});
app.get('/contactPage', (req, res) => {
    console.log("user is here /contactPage")
    res.render('pages/contactPage');
});

app.get('/contactPage', (req, res) => {   
    console.log(my_contacts);
    db_handler.collection(COLLECTION_CONTACTS).find({}).toArray((err, result) => {  
      if (err) {   
          console.log(err);
       } else {
res.render('pages/contactPage', { 
  'allDetails': result 
          })
       }
    })
});
let my_contacts;
app.post('/contactPage', (req, res) => {
    const form_data = req.body;
    console.log(form_data);
    const Name = form_data['Name'];
    const Email = form_data['Email'];
    const QAC = form_data['QAC'];


    let my_contacts = {
        "Name": Name,
        "Email": Email,
        "QAC": QAC
    }        
    db_handler.collection(COLLECTION_CONTACTS).insertOne(my_contacts, (err, result) => {
    if (err) {
        console.log("Error: " + err);
    }
    else {
        console.log("One Entry Added");
        res.render('pages/confirmation');

    }
})
});


