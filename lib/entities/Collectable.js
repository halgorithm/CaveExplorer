export default class Collectable extends Phaser.Sprite {
  constructor(game, x, y, key) {
    super(game, x, y, key)

    this.game.physics.arcade.enable(this)

    this.actualY = y
    this.bobHeight = 3
    this.bobFrequency = 1
  }

  update() {
    this.position.y = this.actualY + this.bobHeight * Math.sin(this.bobFrequency * 2 * Math.PI * this.game.time.now / 1000)
  }
}
