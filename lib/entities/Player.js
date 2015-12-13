import Boots from './items/Boots'
import Sword from './items/Sword'

export default class Player extends Phaser.Sprite {
  // player can have either the hookshot out OR the knife out. gun?
  // held direction aims hookshot (any direction), or knife (udlr only, or spin attack?)
  // stiffhook (manual rotation instead of swinging)
  // wallslide + horizontal kickoff
  constructor(game, x, y, playerInput) {
    super(game, x, y, 'Player')

    this.playerInput = playerInput
    playerInput.switch.onDown.add(this.switchItem, this)

    this.anchor.set(0.5)

    this.animations.add('idle', [0])
    this.animations.add('walk', [1, 0, 2, 0])
    this.animations.add('fall', [2])

    this.animations.play('idle')

    this.minWalkSpeed = 120
    this.maxWalkSpeed = 340
    this.walkSpeed = 200
    this._setWalkingRight(true)

    this.game.physics.arcade.enable(this)
    this.body.setSize(20, 30, 0, 0)
    this.body.maxVelocity.y = 800
    this.body.gravity.y  = 1000
    this.body.velocity.x = this.walkSpeed

    this.items = {
      boots: new Boots(game, this),
      sword: new Sword(game, this)
    }
    this.items.current = this.items.boots

    this.maxHealth = 2
    this.health = this.maxHealth
    this.lastDamagedAt = 0
    this.invulnerabilityPeriod = 1500 // in ms
  }

  // TODO rename to hitInvulnerability or something so you can do star invincibility later
  get invulnerable() { return this.game.time.now < this.lastDamagedAt + this.invulnerabilityPeriod }

  update() {
    this._useItem()
    this._move()
    this._animate()
  }

  damage(val) {
    if (this.invulnerable) return;

    this.lastDamagedAt = this.game.time.now
    super.damage(val)
  }

  kill () {
    this.game.state.start('PlayState', true);
  }

  changeWalkSpeed(delta) {
    this.walkSpeed = Math.max(this.minWalkSpeed, Math.min(this.maxWalkSpeed, this.walkSpeed + delta))
  }

  _useItem() {
    if (this.playerInput.use.isDown) {
      if (!this.items.current.inUse) this.items.current.beginUse()
      this.items.current.update()
    } else if (this.items.current.inUse) {
      this.items.current.endUse()
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

    if (this.invulnerable) this.alpha = 0.5
    else this.alpha = 1
  }

  switchItem() {
    this.items.current = this.items.current === this.items.boots ? this.items.sword : this.items.boots
  }

  _setWalkingRight(val) {
    this.walkingRight = val
    let sign = val ? 1 : -1
    this.scale.x = sign
  }

  // _doubleJump() {
  //   this.body.velocity.y = -350
  //   // this.body.velocity.x = Math.min(Math.max(this.body.velocity.x, -this.walkSpeed), this.walkSpeed) // clamp
  //
  //   this.usedDoubleJump = true
  // }
}
