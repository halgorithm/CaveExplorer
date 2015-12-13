import HeartIcon from './HeartIcon'

export default class HealthGUI extends Phaser.Group {
  constructor(game, x, y, player) {
    super(game, x, y, 'Health GUI')
    this.x = x
    this.y = y

    this.player = player

    this.hearts = [this.add(new HeartIcon(game, 0, 0))]
    this.padding = 4
  }

  update() {
    this.addMissingHearts()
    for (let i = 0; i < this.hearts.length; i++) {
      let heart = this.hearts[i]

      if (i < this.player.health) {
        heart.animations.play('filled', 1)
      } else {
        heart.animations.play('empty', 1)
      }
    }
  }

  addMissingHearts() {
    let firstHeart = this.hearts[0]

    while (this.hearts.length < this.player.maxHealth) {
      let heart = new HeartIcon(
        this.game,
        firstHeart.x + this.hearts.length * (firstHeart.width + this.padding),
        firstHeart.y,
        firstHeart.key
      )
      this.hearts.push(this.add(heart))
    }
  }
}
