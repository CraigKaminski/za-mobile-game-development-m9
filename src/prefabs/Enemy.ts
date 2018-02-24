import { Game } from '../states/Game';

interface IEnemyData {
  attack: number;
  defense: number;
  health: number;
}

export class Enemy extends Phaser.Sprite {
  public body: Phaser.Physics.Arcade.Body;
  public data: IEnemyData;
  private healthBar: Phaser.Sprite;
  private state: Game;

  constructor(state: Game, x: number, y: number, key: string, data: IEnemyData) {
    super(state.game, x, y, key);

    this.state = state;
    this.data = {...data};

    this.healthBar = new Phaser.Sprite(state.game, this.x, this.y, 'bar');
    this.game.add.existing(this.healthBar);
    this.healthBar.anchor.setTo(0.5);
    this.refreshHealthBar();

    this.anchor.setTo(0.5);
    this.game.physics.arcade.enable(this);
    this.game.physics.arcade.enable(this.healthBar);
    this.body.immovable = true;
  }

  public kill() {
    super.kill();
    this.healthBar.kill();
    return this;
  }

  public update() {
    this.healthBar.x = this.x;
    this.healthBar.y = this.y - 25;
    this.healthBar.body.velocity = this.body.velocity;
  }

  public refreshHealthBar() {
    this.healthBar.scale.setTo(this.data.health, 0.5);
  }
}
