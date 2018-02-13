import { Game } from '../states/Game';

export interface IPlayerData {
  attack: number;
  defense: number;
  gold: number;
  health: number;
  items: any[];
  quests: any[];
}

export class Player extends Phaser.Sprite {
  public btnsPressed: any;
  public data: IPlayerData;
  private state: Game;

  constructor(state: Game, x: number, y: number, data: IPlayerData) {
    super(state.game, x, y, 'player');

    this.data = data;
    this.state = state;

    this.anchor.setTo(0.5);
    this.animations.add('walking', [0, 1, 0], 6, false);
    this.game.physics.arcade.enable(this);
  }
}
