const crypto = require('crypto')
const Dictionary = require('./dictionary.js')
const JSONDb = require('./json-db.js')

class Game {
	constructor({
		difficulty,
		includePunctuation,
		maxAttempts,
		word,
		hint} = {}) {
		this.difficulty = difficulty
		this.includePunctuation = includePunctuation
		this.maxAttempts = maxAttempts
		this.word = word
		this.hint = hint
		this.leftAttempts = maxAttempts
	}

	static create({
		difficulty = 'easy',
		includePunctuation = "false",
		maxAttempts = 5
	} = {}) {
		difficulty = difficulty.replace(/['"]+/g, '')
		includePunctuation = includePunctuation.replace(/['"]+/g, '')
		return Dictionary.getWord(difficulty)
			.then(word => {
				const newGame = new Game({
					difficulty: difficulty,
					includePunctuation: includePunctuation,
					maxAttempts: maxAttempts,
					word: word,
					hint: Game.createHint(word)
				})
				newGame.id = crypto.randomBytes(12).toString('hex');
				return JSONDb.save(newGame)
			})
			.then(savedGame => {
				// delete savedGame.word
				return savedGame
			})
	}

	static createHint(word) {
		// TODO replace duplicate characters too in hint
		const wordLength = word.length
		const index = Math.floor(Math.random() * wordLength);
		return Array.from(word).map((ch, i) => i === index ? ch : '_').join(' ')
	}

	static attempt(gameId, attempt) {
		return JSONDb.getGameById(gameId)
			.then(game => {
				if (game.word.includes(attempt.letter)) {
					// TODO udpate hint and save that
					return game;
				}
				if(game.leftAttempts > 0){
						game.leftAttempts--;
						game.isInvalid = true;
				} else {
					game.isGameOver = true;
				}
				return JSONDb.save(game);
			})
			.then(savedGame => {
				delete savedGame.word;
				return savedGame;
			})
			.catch()
	}
}

module.exports = Game
