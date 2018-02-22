import { Game } from '../states/Game';

interface IEnemyData {
  attack: number;
  defense: number;
  health: number;
}

export class Enemy extends Phaser.Sprite {
  public data: IEnemyData;
  private state: Game;

  constructor(state: Game, x: number, y: number, key: string, data: IEnemyData) {
    super(state.game, x, y, key);

    this.state = state;
    this.data = data;

    this.anchor.setTo(0.5);
    this.game.physics.arcade.enable(this);
  }
}
