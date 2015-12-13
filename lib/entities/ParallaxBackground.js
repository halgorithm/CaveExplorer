export default class ParallaxBackground extends Phaser.TileSprite {
  constructor(game, x, y, width, height, key, scrollX = 1.0, scrollY = 1.0) {
    width  = width || game.width
    height = height || game.height
    super(game, x, y, width, height, key)

    this.scrollX = scrollX
    this.scrollY = scrollY
    this.offset = new PIXI.Point(0)
    // this.tileOffset = new PIXI.Point(0)
  }

  update() {
    this.position.set(
      this.game.camera.position.x + this.offset.x - this.width / 2,
      this.game.camera.position.y + this.offset.y - this.height / 2,
    )
    let tilePos = this.game.camera.position.clone()
    tilePos.multiply(-5.0 * this.scrollX, -5.0 * this.scrollY)

    this.tilePosition.copyFrom(this.game.camera.position).multiply(-this.scrollX, -this.scrollY)
  }
}
