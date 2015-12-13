export default class Chest extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'Treasure Chest')
  }

  touched(player) {
    // Give a random rare item?
  }
}
