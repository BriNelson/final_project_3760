import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import movieSaveSchema from './models/movieModel.js'
// TODO: config file
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


app.post('/haveWatched', (req, res) => {
  
  const movieSave = new movieSaveSchema({

    title: req.body.title,
    key: req.body.key,
    summary: req.body.summary,
    network: req.body.network,
    imgUrl: req.body.imgUrl,
    genere: req.body.genere,
    score: req.body.score,
    wantWatch: req.body.wantWatch,
    favorite: req.body.favorite

  })
  movieSave.save().then((result) => { console.log(result) })
})

app.post('/wantWatched', (req, res) => {
  
  const movieSave = new movieSaveSchema({

    title: req.body.title,
    key: req.body.key,
    summary: req.body.summary,
    network: req.body.network,
    imgUrl: req.body.imgUrl,
    genere: req.body.genere,
    score: req.body.score,
    wantWatch: req.body.wantWatch,
    favorite: req.body.favorite

  })
  movieSave.save().then((result) => { console.log(result) })
})



if (port == null || port == '') {
  port = 8000
}


app.listen(port)