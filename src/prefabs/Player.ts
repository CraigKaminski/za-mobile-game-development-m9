import { Game } from '../states/Game';

interface IBtnsPressed {
  action?: boolean;
  down?: boolean;
  downleft?: boolean;
  downright?: boolean;
  left?: boolean;
  right?: boolean;
  up?: boolean;
  upleft?: boolean;
  upright?: boolean;
}

export interface IPlayerData {
  attack: number;
  defense: number;
  gold: number;
  health: number;
  items: any[];
  quests: any[];
}

export class Player extends Phaser.Sprite {
  public body: Phaser.Physics.Arcade.Body;
  public btnsPressed: IBtnsPressed;
  public data: IPlayerData;
  private state: Game;

  constructor(state: Game, x: number, y: number, data: IPlayerData) {
    super(state.game, x, y, 'player');

    this.data = data;
    this.state = state;

    this.anchor.setTo(0.5);
    this.animations.add('walk', [0, 1, 0], 6, false);
    this.game.physics.arcade.enable(this);
  }
}
