import { Game } from '../states/Game';

interface IItemData {
  attack?: number;
  defense?: number;
  gold?: number;
  health?: number;
  isQuest?: boolean;
  questCode?: string;
}

export class Item extends Phaser.Sprite {
  public data: IItemData;
  private state: Game;

  constructor(state: Game, x: number, y: number, key: string, data: IItemData) {
    super(state.game, x, y, key);

    this.state = state;
    this.data = {...data};

    this.anchor.setTo(0.5);
    this.game.physics.arcade.enable(this);
  }
}
