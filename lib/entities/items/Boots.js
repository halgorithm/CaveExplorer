import Item from '../Item'

export default class Boots extends Item {
  constructor(game, player) {
    super(game, player)
  }

  beginUse() {
    super.beginUse()

    // if (this.body.blocked.down) this._jump()
    // else if (!this.usedDoubleJump)   this._doubleJump()
    // -350
    if (this.player.body.blocked.down) {
      this.player.body.velocity.y = -250
    }
  }

  update() {
    if (this.player.body.velocity.y > 0) return;

    this.player.body.velocity.y -= 265 * this.game.time.elapsed / 1000
  }
}
