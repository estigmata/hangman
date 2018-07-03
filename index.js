const express = require('express')
const app = express()
const Dictionary = require('./src/Dictionary')
Dictionary.getWord().then(word => console.log('word: ', word))

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/game', (req, res) => {
  res.send({
    id: 1,
    hint: '_____A',
    remainings: 5,
    image: `
 _______
|/      |
|      (_)
|      \|/
|       |
|      / \\n
|
|___`
  })
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
