export class Game extends Phaser.State {
  private backgroundLayer: Phaser.TilemapLayer;
  private collisionLayer: Phaser.TilemapLayer;
  private currentLevel: string;
  private cursors: Phaser.CursorKeys;
  private map: Phaser.Tilemap;
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
  }

  private gameOver() {
    this.state.start('Game', true, false, this.currentLevel);
  }
}
