export class Preload extends Phaser.State {
  public preload() {
    const preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'bar');
    preloadBar.anchor.setTo(0.5);
    preloadBar.scale.setTo(100, 1);

    this.load.setPreloadSprite(preloadBar);

    this.load.image('sword', 'images/attack-icon.png');
    this.load.image('quest', 'images/quest-button.png');
    this.load.image('chest', 'images/chest-gold.png');
    this.load.image('coin', 'images/coin.png');
    this.load.image('potion', 'images/potion.png');
    this.load.image('shield', 'images/shield.png');
    this.load.image('scroll', 'images/scroll-skull.png');
    this.load.image('strangeItem', 'images/gods-helmet.png');

    this.load.image('monster', 'images/demon.png');
    this.load.image('dragon', 'images/goldendragon.png');
    this.load.image('snake', 'images/snake.png');
    this.load.image('skeleton', 'images/swordskeleton.png');

    this.load.spritesheet('player', 'images/player.png', 30, 30, 2, 0, 2);
    this.load.image('tilesheet', 'images/terrains.png');

    this.load.tilemap('map1', 'levels/world.json', null, Phaser.Tilemap.TILED_JSON);
  }

  public create() {
    this.state.start('Game');
  }
}
