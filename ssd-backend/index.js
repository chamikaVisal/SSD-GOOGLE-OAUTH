
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { google } = require('googleapis');
const fs = require("fs");
const formidable = require('formidable');
const credentials = require('./credentials.json');
const Token = require('./models/token.model')
var mongoose = require('mongoose');

const client_id = credentials.web.client_id;
const client_secret = credentials.web.client_secret;
const redirect_uris = credentials.web.redirect_uris;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

const SCOPE = ['https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive.file']

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send(' API Running'));

app.get('/getAuthURL', (req, res) => {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPE,
    });
    console.log(authUrl);
    return res.send(authUrl);
});

app.post('/getToken', (req, res) => {
    if (req.body.code == null) return res.status(400).send('Invalid Request');
    oAuth2Client.getToken(req.body.code, (err, token) => {
        if (err) {
            console.error('Error retrieving access token', err);
            return res.status(400).send('Error retrieving access token');
        }
        res.send(token);
    });
});

// get user info -ravindu
app.post('/getUserInfo', (req, res) => {
    if (req.body.token == null) return res.status(400).send('Token not found');
    oAuth2Client.setCredentials(req.body.token);
    const oauth2 = google.oauth2({ version: 'v2', auth: oAuth2Client });

    oauth2.userinfo.get((err, response) => {
        if (err) res.status(400).send(err);
        console.log(response.data);
        res.send(response.data);
    })
});


//save token on DB - ravindu
app.post('/createToken', (req, res) => {

    const token = new Token({
        token: req.body.token,
     
    })
    token.save().then(tok => {
        console.log("token Added")
        try {
            res.status(200).send({
                message: 'token created successfully !',
                data: tok
            })

        } catch (err) {
            res.status(502).send({
                message: 'OOPS ! server error',
                error: err
            })
        }

    })
})  

//HANSI
//Read Drive
app.post('/readDrive', (req, res) => {
    if (req.body.token == null) return res.status(400).send('Token not found');
    oAuth2Client.setCredentials(req.body.token);
    const drive = google.drive({ version: 'v3', auth: oAuth2Client });
    drive.files.list({
        pageSize: 10,
    }, (err, response) => {
        if (err) {
            console.log('The API returned an error: ' + err);
            return res.status(400).send(err);
        }
        const files = response.data.files;
        if (files.length) {
            console.log('Files:');
            files.map((file) => {
                console.log(`${file.name} (${file.id})`);
            });
        } else {
            console.log('No files found.');
        }
        res.send(files);
    });
});

// ------------------------------------------------------------------------------------------------


//CHAMIKA
//DB connection

const dbURL = "mongodb+srv://chamika:Asd123+++@afcluster1-3t6tc.mongodb.net/test";
mongoose
    .connect(dbURL, { useNewUrlParser: true,  useUnifiedTopology: true })
    .then(() => console.log("mongodb connected"))
    .catch(err => console.log(err));


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server Started ${PORT}`));
// ------------------------------------------------------------------------------------------------
// test commit from nishiki