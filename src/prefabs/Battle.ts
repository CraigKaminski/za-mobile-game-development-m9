export class Battle {
  private game: Phaser.Game;

  constructor(game: Phaser.Game) {
    this.game = game;
  }

  public attack(attacker: Phaser.Sprite, attacked: Phaser.Sprite) {
    const damage = Math.max(0, attacker.data.attack * Math.random() - attacked.data.defense * Math.random());

    attacked.data.health -= damage;

    const attackedTween = this.game.add.tween(attacked);
    attackedTween.to({tint: 0xFF0000}, 200);
    attackedTween.onComplete.add(() => {
      attacked.tint = 0xFFFFFF;
    }, this);
    attackedTween.start();

    if (attacked.data.health <= 0) {
      attacked.kill();
    }
  }
}
