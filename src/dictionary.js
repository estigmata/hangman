const readWords = require('./word-reader')

class Dictionary {
  static getWord() {
    return readWords({path: './assets/es-MX.dic'})
      .then(totalWords => {
        const index = Math.floor(Math.random() * (totalWords.length - 0 + 1) + 0)
        return totalWords[index]
      })
  }
}

module.exports = Dictionary
