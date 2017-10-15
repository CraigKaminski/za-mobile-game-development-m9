// tslint:disable:ordered-imports
import 'p2';
import 'pixi';
import 'phaser';
// tslint:enable:ordered-imports

import GameState from './states/Game';

class Game extends Phaser.Game {
  constructor() {
    super(800, 600, Phaser.AUTO, '', null);

    this.state.add('game', GameState, true);
  }
}

new Game(); // tslint:disable-line:no-unused-expression
