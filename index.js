const express = require('express')

const Dictionary = require('./src/dictionary')
const Game = require('./src/game')

const app = express()
let wordGuess
let id = 25

Dictionary.getWord().then(word => wordGuess = word)

app.get('/', (req, res) => res.send(wordGuess))

app.get('/game', (req, res) => {
  Game.create({id: id, guess: wordGuess})
    .then(game => {
      res.send(game)
    })
    .catch(err => {
      res.status(500).send({
        error: 'Game could not be created'
      })
    })
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
