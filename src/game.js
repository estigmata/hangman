const wf = require('fs');

class Game {
  static create (params) {
    Object.assign(this, params)
    this.hint = Array(this.guess.length).join('_').split('').join(' ');
    this.leftAttempts = 5
    return new Promise((resolve, reject) => {
      const thisGame = `{
        ${this.id}: {
          "id": ${this.id},
          "guess": ${this.guess},
          "hint": ${this.hint},
          "leftAttempts": ${this.leftAttempts}
        }
      }`
      wf.writeFile('./assets/saved-games.json', JSON.stringify(thisGame, null, 2), (error) => {
        if (error) {
          reject('The file could not be create.')
        }
        else {
          resolve('The file was create.')
        }
      })
    })
  }
}

module.exports = Game
