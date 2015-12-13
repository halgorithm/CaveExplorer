import _ from 'lodash'
import ParallaxBackground from '../entities/ParallaxBackground'
import Player from '../entities/Player'
import GUIGroup from '../entities/gui/GUIGroup'
import InventoryGUI from '../entities/gui/InventoryGUI'
import HealthGUI from '../entities/gui/HealthGUI'
import SlimeEnemy from '../entities/enemies/SlimeEnemy'
import WalkingEnemy from '../entities/enemies/WalkingEnemy'
import SpeedChange from '../entities/collectables/SpeedChange'

export default class PlayState extends Phaser.State {
  preload() {
    this.game.load.image('Background', 'assets/images/backgrounds/background.png')

    this.game.load.tilemap('Test Map', 'assets/tilemaps/maps/test3.json', null, Phaser.Tilemap.TILED_JSON)
    this.game.load.image('Cave Tileset', 'assets/tilemaps/tilesets/ground.png')

    this.game.load.spritesheet('Player', 'assets/images/spritesheets/quote_walk.png', 32, 32)

    // Inventory
    this.game.load.image('Inventory Frame', 'assets/images/static/inventory frame.png')
    this.game.load.spritesheet('Item Selector', 'assets/images/spritesheets/selector.png', 40, 40)

    // GUI Icons
    this.game.load.spritesheet('Heart Icon', 'assets/images/spritesheets/heart.png', 22, 21)
    this.game.load.spritesheet('Boots Icon', 'assets/images/spritesheets/boots.png', 32, 32)
    this.game.load.spritesheet('Sword Icon', 'assets/images/spritesheets/sword.png', 32, 32)

    // Enemies
    this.game.load.spritesheet('Slime Enemy', 'assets/images/spritesheets/slime.png', 32, 22)
    this.game.load.spritesheet('Walking Enemy', 'assets/images/spritesheets/walking_enemy.png', 32, 32)

    // Collectables
    this.game.load.spritesheet('Speed Up', 'assets/images/spritesheets/speed_up.png', 32, 32)
    this.game.load.spritesheet('Speed Down', 'assets/images/spritesheets/speed_down.png', 32, 32)
    this.game.load.spritesheet('Error', 'assets/images/spritesheets/error.png', 32, 32)

    // Particles
    this.game.load.image('Dust', 'assets/images/static/dust.png')
  }

  create() {
    this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // this._loadRooms()

    this._setupBackground()
    this._setupMap()
    this._setupPlayer()
    this._setupEnemies()
    this._setupCollectables()
    // this._loadRoom("Test Map")
    this._setupHUD()

    this.game.camera.follow(this.player)
  }

  update() {
    this.game.physics.arcade.collide(this.enemies, this.mapLayer)
    this.game.physics.arcade.collide(this.player, this.mapLayer)
    this.game.physics.arcade.overlap(this.player, this.collectables, (player, collectable) => {
      collectable.touched(player)
    })
    this.game.physics.arcade.overlap(this.player, this.enemies, (player, enemy) => {
      enemy.touched(player)
    })

    this.player.update()
    _.invoke(this.collectables.children, 'update')
  }

  preRender() {
    this.background.update() // FIXME seems stupid, but whatever
    this.hud.update()
  }

  render() {
    // this.game.debug.body(this.enemies.children[0])
  }



  _setupBackground() {
    this.background = this.game.add.existing(
      new ParallaxBackground(this.game, 0, 0, this.game.width, this.game.height, 'Background', 0.5, 0.5)
    )
  }

  _setupMap() {
    this.map = this.game.add.tilemap('Test Map')
    this.map.addTilesetImage('terrain', 'Cave Tileset')

    let platformTileIndices = [3]
    this.map.setCollision([1, 2, 3])

    this.mapLayer = this.map.createLayer('walls')
    this.mapLayer.resizeWorld()

    _.forEach(this.mapLayer.layer.data, (tileArray) => {
      _.forEach(tileArray, (tile) => {
        if (_.includes(platformTileIndices, tile.index)) {
          tile.collideDown  = false
          tile.collideLeft  = false
          tile.collideRight = false
          tile.collideUp    = true
        }
      })
    })
  }

  _setupPlayer() {
    this.player = this.game.add.existing(
      new Player(this.game, 32, 32, this._createPlayerInput())
    )
  }

  _createPlayerInput() {
    let input    = this.game.input.keyboard.createCursorKeys()
    input.switch = this.game.input.keyboard.addKey(Phaser.Keyboard.Z)
    input.use    = this.game.input.keyboard.addKey(Phaser.Keyboard.X)

    return input
  }

  _setupEnemies() {
    this.enemies = this.game.add.group(undefined, 'Enemies')//(undefined, 'Enemies')
    this.enemies.add(new WalkingEnemy(this.game, 11 * 32, 7 * 32))
    this.enemies.add(new SlimeEnemy(this.game, 11 * 32, 20 * 32))
  }

  _setupCollectables() {
    this.collectables = this.game.add.group(undefined, 'Collectables')
    this.collectables.add(new SpeedChange(this.game, 400, 100, -60))
  }

  _setupHUD() {
    this.hud = this.game.add.existing(new GUIGroup(this.game, 0, 0, 'GUI'))
    let inventory = this.hud.add(
      new InventoryGUI(this.game, this.game.width / 2, this.game.height - 50, this.player.items)
    )
    inventory.x -= inventory.frame.width / 2
    this.hud.add(new HealthGUI(this.game, 4, 4, this.player))
  }
}
