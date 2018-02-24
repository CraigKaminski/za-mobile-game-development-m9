import { OnscreenControls } from '../plugins/OnscreenControls';
import { Battle } from '../prefabs/Battle';
import { Enemy } from '../prefabs/Enemy';
import { Item } from '../prefabs/Item';
import { IPlayerData, Player } from '../prefabs/Player';

export class Game extends Phaser.State {
  private attackIcon: Phaser.Sprite;
  private attackLabel: Phaser.Text;
  private backgroundLayer: Phaser.TilemapLayer;
  private battle: Battle;
  private collisionLayer: Phaser.TilemapLayer;
  private currentLevel: string;
  private cursors: Phaser.CursorKeys;
  private defenseIcon: Phaser.Sprite;
  private defenseLabel: Phaser.Text;
  private enemies: Phaser.Group;
  private goldIcon: Phaser.Sprite;
  private goldLabel: Phaser.Text;
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

    this.game.physics.arcade.overlap(this.player, this.enemies, this.attack, undefined, this);

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

  public refreshStats() {
    this.attackLabel.text = this.player.data.attack.toString();
    this.defenseLabel.text = this.player.data.defense.toString();
    this.goldLabel.text = this.player.data.gold.toString();
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
    this.loadItems();

    this.enemies = this.add.group();
    // this.loadEnemies();
    const enemy = new Enemy(this, 200, 60, 'monster', {attack: 10, health: 20, defense: 5});
    this.enemies.add(enemy);

    this.battle = new Battle(this.game);

    this.game.camera.follow(this.player);

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

    this.showPlayerIcons();
  }

  private showPlayerIcons() {
    this.goldIcon = this.add.sprite(10, 10, 'coin');
    this.goldIcon.fixedToCamera = true;

    const style = {
      fill: '#fff',
      font: '14px Arial',
    };
    this.goldLabel = this.add.text(30, 10, '0', style);
    this.goldLabel.fixedToCamera = true;

    this.attackIcon = this.add.sprite(70, 10, 'sword');
    this.attackIcon.fixedToCamera = true;

    this.attackLabel = this.add.text(90, 10, '0', style);
    this.attackLabel.fixedToCamera = true;

    this.defenseIcon = this.add.sprite(130, 10, 'shield');
    this.defenseIcon.fixedToCamera = true;

    this.defenseLabel = this.add.text(150, 10, '0', style);
    this.defenseLabel.fixedToCamera = true;

    this.refreshStats();
  }

  private findObjectsByType(targetType: string, tilemap: Phaser.Tilemap, layer: string) {
    const result: any[] = [];

    (tilemap.objects as any)[layer].forEach((element: any) => {
      if (element.properties.type === targetType) {
        element.y -= tilemap.tileHeight / 2;
        element.x += tilemap.tileHeight / 2;
        result.push(element);
      }
    });

    return result;
  }

  private loadItems() {
    const elementsArr = this.findObjectsByType('item', this.map, 'objectsLayer');
    let elementObj;

    elementsArr.forEach((element) => {
      for (const prop of ['attack', 'defense', 'gold', 'health']) {
        if (element.properties[prop]) {
          element.properties[prop] = +element.properties[prop];
        }
      }
      elementObj = new Item(this, element.x, element.y, element.properties.asset, element.properties);
      this.items.add(elementObj);
    });
  }

  private loadEnemies() {

  }

  private attack(player: Player, enemy: Enemy) {
    this.battle.attack(player, enemy);
    this.battle.attack(enemy, player);

    if (player.body.touching.up) {
      player.y += 20;
    }
    if (player.body.touching.down) {
      player.y -= 20;
    }
    if (player.body.touching.left) {
      player.x += 20;
    }
    if (player.body.touching.right) {
      player.x -= 20;
    }
  }
}
