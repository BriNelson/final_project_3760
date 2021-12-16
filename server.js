import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import movieSaveSchema from './models/movieModel.js'

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


app.post('/favorite', (req, res) => {
  
  const movieSave = new movieSaveSchema({

    title: req.body.title,
    key: req.body.key,
    summary: req.body.summary,
    network: req.body.network,
    imgUrl: req.body.imgUrl,
    genere: req.body.genere,
    score: req.body.score,
    webChannel: req.body.webChannel,
    faveList: req.body.faveList,
    wantWatch: req.body.wantWatch,

  })
  movieSave.save().then((result) => { console.log(result) })
})

app.post('/wantWatch', (req, res) => {
   console.log("hitting end points")
  const movieSave = new movieSaveSchema({

    title: req.body.title,
    key: req.body.key,
    summary: req.body.summary,
    network: req.body.network,
    imgUrl: req.body.imgUrl,
    genere: req.body.genere,
    score: req.body.score,
    webChannel: req.body.webChannel,
    faveList: req.body.faveList,
    wantWatch: req.body.wantWatch,

  })
  movieSave.save().then((result) => { console.log(result) })
})



if (port == null || port == '') {
  port = 8000
}


app.listen(port)