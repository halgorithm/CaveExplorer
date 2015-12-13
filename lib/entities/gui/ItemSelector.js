export default class ItemSelector extends Phaser.Sprite {
  constructor(game) {
    super(game, 0, 0, 'Item Selector')

    this.animations.add('idle', [0])
    this.animations.add('inUse', [1])

    this.animations.play('idle')
  }
}
