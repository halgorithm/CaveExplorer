export default class WalkingEnemy extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'Walking Enemy')

    this.walkSpeed    = 80
    this._setWalkingRight(true)

    this.anchor.set(0.5)
    this.game.physics.arcade.enable(this)
    this.body.setSize(20, 30, 0, 0)
    this.body.maxVelocity.y = 800
    this.body.gravity.y     = 800
    this.body.velocity.x    = this.walkSpeed

    this.animations.add('walk', [1, 0, 2, 0])
    this.animations.add('fall', [2])

    this.animations.play('walk')

    this.attack = 1
  }

  update() {
    this._move()
    this._animate()
  }

  touched(other) {
    if (other.body.velocity.y > 0) {
      this.damage(1) // other.attack
      other.body.velocity.y = -250
    }
    else {
      other.damage(this.attack)
    }
  }

  _move() {
    if (this.body.blocked.left) this._setWalkingRight(true)
    if (this.body.blocked.right) this._setWalkingRight(false)

    this.body.velocity.x = this.walkSpeed
    if (!this.walkingRight) this.body.velocity.x *= -1
  }

  _animate() {
    if (this.body.blocked.down) this.animations.play('walk', 8, true)
    else this.animations.play('fall', 8, true)
  }

  _setWalkingRight(val) {
    this.walkingRight = val
    let sign = val ? 1 : -1
    this.scale.x = sign
  }
}
