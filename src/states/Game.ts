export class Game extends Phaser.State {
  public preload() {
    this.game.load.image('logo', 'images/phaser.png');
  }

  public create() {
    const logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    logo.anchor.setTo(0.5, 0.5);
  }
}
