import { IPlayerData, Player } from '../prefabs/Player';

export class Game extends Phaser.State {
  private backgroundLayer: Phaser.TilemapLayer;
  private collisionLayer: Phaser.TilemapLayer;
  private currentLevel: string;
  private cursors: Phaser.CursorKeys;
  private map: Phaser.Tilemap;
  private player: Player;
  private readonly PLAYER_SPEED = 90;

  public init(currentLevel: string) {
    this.currentLevel = currentLevel ? currentLevel : 'map1';
    this.physics.arcade.gravity.y = 0;
    this.cursors = this.game.input.keyboard.createCursorKeys();
  }

  public create() {
    this.loadLevel();
  }

  public update() {

  }

  private loadLevel() {
    this.map = this.add.tilemap(this.currentLevel);
    this.map.addTilesetImage('terrains', 'tilesheet');
    this.backgroundLayer = this.map.createLayer('backgroundLayer');
    this.collisionLayer = this.map.createLayer('collisionLayer');
    this.world.sendToBack(this.backgroundLayer);
    this.map.setCollisionBetween(1, 16, true, 'collisionLayer');
    this.collisionLayer.resizeWorld();

    const playerData: IPlayerData = {
      attack: 12,
      defense: 8,
      gold: 100,
      health: 25,
      items: [],
      quests: [],
    };

    this.player = new Player(this, 100, 100, playerData);

    this.add.existing(this.player);
  }

  private gameOver() {
    this.state.start('Game', true, false, this.currentLevel);
  }
}
