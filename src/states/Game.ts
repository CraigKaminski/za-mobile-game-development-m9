const logoUrl = require('../assets/images/phaser.png');

class GameState extends Phaser.State {
  public preload() {
    this.game.load.image('logo', logoUrl);
  }

  public create() {
    const logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    logo.anchor.setTo(0.5, 0.5);
  }
}

export default GameState;
