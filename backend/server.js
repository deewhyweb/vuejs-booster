'use strict';

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

// Add a health check
require('kube-probe')(app);

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

const Contact = require('./model/Contact.model');

mongoose.Promise = global.Promise;
const mongoURL = process.env.MONGO_URL || 'mongodb://default:default@contacts/contacts';

mongoose.connect(mongoURL, { useMongoClient: true })
  .then(_ => console.log(`Connected to mongodb at ${mongoURL}`))
  .catch(err => console.error(`Unable to connect to mongo db at ${mongoURL}
  ${err}`));

app.get('/contacts', async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
});

app.post('/contacts', (req, res) => {
  const contact = new Contact();
  contact.name = req.body.name;
  contact.email = req.body.email;
  contact.number = req.body.number;
  contact.save()
    .then((response) => {
      res.body = {success: true, contact: response};
      res.json(res.body);
    })
    .catch(e => {
      console.error(e);
    });
});

app.delete('/contacts/:id', (req, res) => {
  Contact.findOneAndRemove({_id: req.params.id})
    .then(() => {
      res.body = {success: true};
      res.json(res.body);
    })
    .catch(e => {
      console.error(`Error removing contact with ID: ${req.params.id}.`);
    });
});

app.get('/contacts/:id', (req, res) => {
  Contact.findById({_id: req.params.id})
    .then((contact) => {
      res.json(contact);
    })
    .catch(e => {
      console.error(`Error trying to find a contact with ID: ${req.params.id}.`);
    });
});

app.put('/contacts/:id', (req, res) => {
  Contact.findOneAndUpdate(
    {_id: req.params.id},
    {$set: {name: req.body.name, email: req.body.email, number: req.body.number}}
  ).then(() => {
    res.body = {success: true};
    res.json(res.body);
  }).catch(e => {
    console.error(`Error updating Contact with ID: ${req.params.id}.`);
  });
});

app.listen(process.env.PORT);

console.log('server running.');
