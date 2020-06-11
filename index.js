const express = require('express');
const body_parser = require('body-parser');
const mongodb = require('mongodb');
const app = express();
const PORT = 3003;
const path = require('path');
const dotenv = require('dotenv').config();

let mongoClient = mongodb.MongoClient;


app.set('view engine', 'ejs');


//look at Unit 19 day 4
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

let db_handler;
const DB_URL = process.env.DB_URL;
const DB_NAME = process.env.DB_NAME;
const COLLECTION_NAME = process.env.COLLECTION_NAME;

app.listen(PORT, () => {
    console.log('Server started on 3003');
    mongoClient.connect(DB_URL, (err, db) => {
        if (err) {
            console.log(err);
        } else {
            console.log('connected to database');
            // open database
            db_handler = db.db(DB_NAME);
        }
    });

});

//homepage should be rendered 
app.get('/', (req, res) => {
    res.render('pages/index');
    res.send('Personal Webpage Project');
});
// app.get('/', (req,res) => { res.render('index')}

app.get('/index', (req, res) => {
    res.render('pages/index');
});

app.get('/aboutPage', (req, res) => {
    res.render('pages/aboutPage');
});

app.get('/commentsUploads', (req, res) => {
    res.render('pages/commentsUploads');
});

app.get('/contactPage', (req, res) => {
    res.render('pages/contactPage');
});

app.get('/galleryPage', (req, res) => {   
    // res.render('pages/galleryPage',
    console.log(my_object);
    db_handler.collection(COLLECTION_NAME).find({}).toArray((err, result) => {  
      if (err) {   
          console.log(err);
       } else {
res.render('/galleryPage', { 
//   'allDetails': result 
          })
       }
    })
//   )
});

// app.get('/galleryPage', (req, res) => {
//     res.render('pages/galleryPage', db_handler.collection(COLLECTION_NAME).find({}).toArray((err, result) => {
//         if (err) {
//             console.log(err);
//         } else {
//             res.render('pages/allDetails', {
//                 'allDetails': result
//             }); 
// );
//             });
//         )


app.get('/mapPage', (req, res) => {
    res.render('pages/mapPage');
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
            res.render('/allDetails');
        }
    });
    // res.render('pages/allDetails')

});



// app.post('pages/allDetails', (req, res) => {
//     // req.body contains form information
//     const form_data = req.body;
//     console.log(form_data);
//     const artName = form_data['artName'];
//     const address = form_data['address'];
// 	const link = form_data['link'];


// 	// const bags = parseInt(form_data['bags']);

// 	const my_object = {
//         "artName": artName,
//         "address": address,
//         "link": link
//     }});