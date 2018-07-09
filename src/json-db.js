const fs = require('fs')

class JSONDb {
	static save(game) {
		return new Promise((resolve, reject) => {
			const JSON_DB = require('../assets/saved-games.json')
			JSON_DB[game.id] = game

			fs.writeFile('./assets/saved-games.json', JSON.stringify(JSON_DB, null, 4), (error, response) => {
				if (error) {
					return reject(error)
				}

				resolve(game)
			})
		})
	}

	static getGameById(gameId) {
		return new Promise((resolve, reject) => {
			const JSON_DB = require('./saved-games.json')
			const game = JSON_DB[gameId]
			if (game === undefined) {
				return reject('Game not found')
			}
			resolve(game)
		})
	}
}

module.exports = JSONDb
