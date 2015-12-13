import _ from 'lodash'

export default class GUIGroup extends Phaser.Group {
  constructor(game, x, y, name) {
    super(game, null, name)

    this.offset = new PIXI.Point(x, y)
  }

  update() {
    this.x = this.game.camera.x + this.offset.x
    this.y = this.game.camera.y + this.offset.y

    _.forEach(this.children, (child) => {
      if (child.update) child.update()
    })
  }
}
