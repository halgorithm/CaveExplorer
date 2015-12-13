export default class SlimeEnemy extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'Slime Enemy')

    this.game.physics.arcade.enable(this)
    this.body.gravity.y = 800
    this.body.maxVelocity.y = 800

    this.animations.add('idle', [0, 1])
    this.animations.play('idle', 6)

    this.health = 1
    this.attack = 1
  }

  touched(other) {
    if (other.body.velocity.y > 0) {
      this.damage(1) // other.attack
      other.body.velocity.y = -250
    } else {
      other.damage(this.attack)
    }
  }
}
