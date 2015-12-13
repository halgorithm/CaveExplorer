import Collectable from '../Collectable'

export default class SpeedChange extends Collectable {
  constructor(game, x, y, amount) {
    let key
    if (amount === undefined) key = "Error"
    else if (amount > 0) key = 'Speed Up'
    else key = 'Speed Down'
    
    super(game, x, y, key)

    this.amount = amount
  }

  touched(player) {
    player.changeWalkSpeed(this.amount)
    this.destroy()
  }
}
