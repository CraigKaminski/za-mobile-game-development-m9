import { OnscreenControls } from '../plugins/OnscreenControls';
import { Item } from '../prefabs/Item';
import { IPlayerData, Player } from '../prefabs/Player';

export class Game extends Phaser.State {
  private backgroundLayer: Phaser.TilemapLayer;
  private collisionLayer: Phaser.TilemapLayer;
  private currentLevel: string;
  private cursors: Phaser.CursorKeys;
  private items: Phaser.Group;
  private map: Phaser.Tilemap;
  private onscreenControls: OnscreenControls;
  private player: Player;
  private readonly PLAYER_SPEED = 90;

  public init(currentLevel: string) {
    this.currentLevel = currentLevel ? currentLevel : 'map1';
    this.physics.arcade.gravity.y = 0;
    this.cursors = this.game.input.keyboard.createCursorKeys();
  }

  public create() {
    this.onscreenControls = this.game.plugins.add(OnscreenControls);
    this.loadLevel();
  }

  public update() {
    this.game.physics.arcade.collide(this.player, this.collisionLayer);

    this.game.physics.arcade.overlap(this.player, this.items, this.collect, undefined, this);
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;

    if (
      this.cursors.left.isDown ||
      this.player.btnsPressed.left ||
      this.player.btnsPressed.upleft ||
      this.player.btnsPressed.downleft
    ) {
      this.player.body.velocity.x = -this.PLAYER_SPEED;
      this.player.scale.setTo(1, 1);
    }

    if (
      this.cursors.right.isDown ||
      this.player.btnsPressed.right ||
      this.player.btnsPressed.upright ||
      this.player.btnsPressed.downright
    ) {
      this.player.body.velocity.x = this.PLAYER_SPEED;
      this.player.scale.setTo(-1, 1);
    }

    if (
      this.cursors.up.isDown ||
      this.player.btnsPressed.up ||
      this.player.btnsPressed.upleft ||
      this.player.btnsPressed.upright
    ) {
      this.player.body.velocity.y = -this.PLAYER_SPEED;
    }

    if (
      this.cursors.down.isDown ||
      this.player.btnsPressed.down ||
      this.player.btnsPressed.downleft ||
      this.player.btnsPressed.downright
    ) {
      this.player.body.velocity.y = this.PLAYER_SPEED;
    }

    if (this.game.input.activePointer.isUp) {
      this.onscreenControls.stopMovement();
    }

    if (this.player.body.velocity.x !== 0 || this.player.body.velocity.y !== 0) {
      this.player.play('walk');
    } else {
      this.player.animations.stop();
      this.player.frame = 0;
    }
  }

  private collect(player: Player, item: Item) {
    player.collectItem(item);
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
      quests: [
        {
          code: 'magic-scroll',
          isCompleted: false,
          name: 'Find the Magic Scroll',
        },
        {
          code: 'gods-helmet',
          isCompleted: false,
          name: 'Find the Helmet of the Gods',
        },
      ],
    };

    this.player = new Player(this, 100, 100, playerData);

    this.add.existing(this.player);

    this.items = this.add.group();

    const potion = new Item(this, 100, 150, 'potion', {health: 10});
    this.items.add(potion);

    const sword = new Item(this, 100, 180, 'sword', {attack: 2});
    this.items.add(sword);

    const shield = new Item(this, 100, 210, 'shield', {defense: 2});
    this.items.add(shield);

    const chest = new Item(this, 100, 240, 'chest', {gold: 100});
    this.items.add(chest);

    const questItem = new Item(this, 100, 270, 'scroll', {isQuest: true, questCode: 'magic-scroll'});
    this.items.add(questItem);

    this.initGUI();
  }

  private gameOver() {
    this.state.start('Game', true, false, this.currentLevel);
  }

  private initGUI() {
    this.onscreenControls.setup(this.player, {
      action: true,
      down: true,
      downleft: true,
      downright: true,
      left: true,
      right: true,
      up: true,
      upleft: true,
      upright: true,
    });
  }
}
