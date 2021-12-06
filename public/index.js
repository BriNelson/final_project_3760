import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
//TODO: SCHEMA FILE import bookSchema from './models/bookModel.js'
//TODO: config file
import { port, mongoUri } from './config.js'
console.log(`Your port is ${port}`)
const app = express()
// const port = 3000;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true

})
  .then(() => {
    console.log('Connected Successfully')
  })
  .catch(console.error)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public')) /// /enviorment variable needs to go here