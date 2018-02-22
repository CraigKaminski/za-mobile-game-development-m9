export class Battle {
  private game: Phaser.Game;

  constructor(game: Phaser.Game) {
    this.game = game;
  }

  public attack(attacker: Phaser.Sprite, attacked: Phaser.Sprite) {
    const damage = Math.max(0, attacker.data.attack * Math.random() - attacked.data.defense * Math.random());

    attacked.data.health -= damage;

    if (attacked.data.health <= 0) {
      attacked.kill();
    }
  }
}
