import PlayState from './lib/states/PlayState'

var game = new Phaser.Game(640, 400, Phaser.AUTO, "game-container", null, false, false)

game.state.add("PlayState", PlayState)

game.state.start("PlayState")
