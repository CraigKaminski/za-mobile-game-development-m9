import { Game } from '../states/Game';

export class Item extends Phaser.Sprite {
  private state: Game;

  constructor(state: Game, x: number, y: number, key: string, data: any) {
    super(state.game, x, y, key);

    this.state = state;
    this.data = data;

    this.anchor.setTo(0.5);
    this.game.physics.arcade.enable(this);
  }
}
