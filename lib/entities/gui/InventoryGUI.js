import ItemSelector from './ItemSelector'

export default class InventoryGUI extends Phaser.Group {
  constructor(game, x, y, items) {
    super(game, null, 'Inventory GUI')
    this.x = x
    this.y = y

    this.items  = items

    this.frame    = this.create(0, 0, 'Inventory Frame')
    this.boots    = this.create(4, 4, 'Boots Icon')
    this.sword    = this.create(40, 4, 'Sword Icon')
    this.selector = this.add(new ItemSelector(game))
  }

  update() {
    if (this.items.current === this.items.boots)
      this.selector.x = 0
    else
      this.selector.x = 36

    if (this.items.current.inUse) this.selector.animations.play('inUse')
    else this.selector.animations.play('idle')
  }
}
