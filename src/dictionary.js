const readWords = require('./word-reader.js')
const range = []
range['easy'] = {greaterThan: 5, lessThan: 8}
range['hard'] = {greaterThan: 8, lessThan: 20}
range['super-easy'] = {greaterThan: 2, lessThan: 5}

class Dictionary {
  static getWord(difficulty = 'easy') {
    return readWords({
      path: './assets/es-ES.dic',
      greaterThan: range[difficulty].greaterThan,
      lessThan: range[difficulty].lessThan})
      .then(totalWords => {
        const index  = Math.floor(Math.random() * (totalWords.length - 0 + 1) + 0)
        return totalWords[index]
      })
  }
}

module.exports = Dictionary
