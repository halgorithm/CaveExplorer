export default class Item {
  constructor(game, player) {
    this.game      = game
    this.player    = player
    this.startedAt = null
    this.endedAt   = null
    this.level     = 1
  }

  get inUse() { return this.startedAt !== null && this.endedAt === null }

  beginUse() {
    this.startedAt = this.game.time.now
    this.endedAt   = null
  }

  update() { }

  endUse() { this.endedAt = this.game.time.now }
}
