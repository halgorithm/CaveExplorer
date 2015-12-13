export default class HeartIcon extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, 'Heart Icon')

    this.animations.add('filled', [0])
    this.animations.add('empty', [1])

    this.animations.play('filled')
  }
}
