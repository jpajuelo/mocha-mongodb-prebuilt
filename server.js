const express = require('express')
const mongoose = require('mongoose') // ODM
const { Log } = require('./log')

const app = express()

mongoose.connect('mongodb://localhost:27017/express', (err) => {
  if (err) {
    console.log(err)
  }
})

app.get('/', (req, res) => {
  Log.find().then((logs) => {
    res.json(logs)
  })
})

app.listen(3000, () => console.log('http://localhost:3000'))
