import { Player } from '../prefabs/Player';

interface IButtons {
  action: boolean;
  down: boolean;
  downleft: boolean;
  downright: boolean;
  left: boolean;
  right: boolean;
  up: boolean;
  upleft: boolean;
  upright: boolean;
}

export class OnscreenControls extends Phaser.Plugin {
  private actionBitmap: Phaser.BitmapData;
  private actionButton: Phaser.Button;
  private btnH: number;
  private btnW: number;
  private diagonalBitmap: Phaser.BitmapData;
  private directionBitmap: Phaser.BitmapData;
  private downArrow: Phaser.Button;
  private downleftArrow: Phaser.Button;
  private downrightArrow: Phaser.Button;
  private downX: number;
  private downY: number;
  private edgeDistance: number;
  private leftArrow: Phaser.Button;
  private leftX: number;
  private leftY: number;
  private player: Player;
  private rightArrow: Phaser.Button;
  private rightX: number;
  private rightY: number;
  private sizeActionBtn: number;
  private upArrow: Phaser.Button;
  private upleftArrow: Phaser.Button;
  private uprightArrow: Phaser.Button;
  private upX: number;
  private upY: number;

  constructor(game: Phaser.Game, parent: Phaser.PluginManager) {
    super(game, parent);

    console.log('plugin ready');
  }

  public setup(player: Player, buttons: IButtons) {
    this.player = player;

    this.player.btnsPressed = this.player.btnsPressed || {};

    this.btnH = 0.08 * this.game.width;
    this.btnW = this.btnH;
    this.edgeDistance = 0.25 * this.btnH;
    this.sizeActionBtn = 1.5 * this.btnH;

    this.leftX = this.edgeDistance;
    this.leftY = this.game.height - this.edgeDistance - this.btnW - this.btnH;

    this.rightX = this.edgeDistance + 2 * this.btnW;
    this.rightY = this.game.height - this.edgeDistance - this.btnW - this.btnH;

    this.upX = this.edgeDistance + this.btnW;
    this.upY = this.game.height - this.edgeDistance - 2 * this.btnW - this.btnH;

    this.downX = this.edgeDistance + this.btnW;
    this.downY = this.game.height - this.edgeDistance - this.btnW;

    this.directionBitmap = this.game.add.bitmapData(this.btnW, this.btnH);
    this.directionBitmap.ctx.fillStyle = '#4BAFE3';
    this.directionBitmap.ctx.fillRect(0, 0, this.btnW, this.btnH);

    this.diagonalBitmap = this.game.add.bitmapData(this.btnW, this.btnH);
    this.diagonalBitmap.ctx.fillStyle = '#4BAFE3';
    this.diagonalBitmap.ctx.fillRect(0, 0, this.btnW, this.btnH);

    this.actionBitmap = this.game.add.bitmapData(this.sizeActionBtn, this.sizeActionBtn);
    this.actionBitmap.ctx.fillStyle = '#C14BE3';
    this.actionBitmap.ctx.fillRect(0, 0, this.btnW, this.btnH);

    if (buttons.left) {
      this.leftArrow = this.game.add.button(this.leftX, this.leftY, this.directionBitmap as any);
      this.leftArrow.alpha = 0.5;
      this.leftArrow.fixedToCamera = true;

      this.leftArrow.events.onInputDown.add(() => {
        this.player.btnsPressed.left = true;
      });

      this.leftArrow.events.onInputUp.add(() => {
        this.player.btnsPressed.left = false;
      });

      this.leftArrow.events.onInputOver.add(() => {
        this.player.btnsPressed.left = true;
      });

      this.leftArrow.events.onInputOut.add(() => {
        this.player.btnsPressed.left = false;
      });
    }

    if (buttons.right) {
      this.rightArrow = this.game.add.button(this.rightX, this.rightY, this.directionBitmap as any);
      this.rightArrow.alpha = 0.5;
      this.rightArrow.fixedToCamera = true;

      this.rightArrow.events.onInputDown.add(() => {
        this.player.btnsPressed.right = true;
      });

      this.rightArrow.events.onInputUp.add(() => {
        this.player.btnsPressed.right = false;
      });

      this.rightArrow.events.onInputOver.add(() => {
        this.player.btnsPressed.right = true;
      });

      this.rightArrow.events.onInputOut.add(() => {
        this.player.btnsPressed.right = false;
      });
    }

    if (buttons.up) {
      this.upArrow = this.game.add.button(this.upX, this.upY, this.directionBitmap as any);
      this.upArrow.alpha = 0.5;
      this.upArrow.fixedToCamera = true;

      this.upArrow.events.onInputDown.add(() => {
        this.player.btnsPressed.up = true;
      });

      this.upArrow.events.onInputUp.add(() => {
        this.player.btnsPressed.up = false;
      });

      this.upArrow.events.onInputOver.add(() => {
        this.player.btnsPressed.up = true;
      });

      this.upArrow.events.onInputOut.add(() => {
        this.player.btnsPressed.up = false;
      });
    }

    if (buttons.down) {
      this.downArrow = this.game.add.button(this.downX, this.downY, this.directionBitmap as any);
      this.downArrow.alpha = 0.5;
      this.downArrow.fixedToCamera = true;

      this.downArrow.events.onInputDown.add(() => {
        this.player.btnsPressed.up = true;
      });

      this.downArrow.events.onInputUp.add(() => {
        this.player.btnsPressed.up = false;
      });

      this.downArrow.events.onInputOver.add(() => {
        this.player.btnsPressed.up = true;
      });

      this.downArrow.events.onInputOut.add(() => {
        this.player.btnsPressed.up = false;
      });
    }

    if (buttons.upleft) {
      this.upleftArrow = this.game.add.button(this.leftX, this.upY, this.directionBitmap as any);
      this.upleftArrow.alpha = 0.3;
      this.upleftArrow.fixedToCamera = true;

      this.upleftArrow.events.onInputDown.add(() => {
        this.player.btnsPressed.upleft = true;
      });

      this.upleftArrow.events.onInputUp.add(() => {
        this.player.btnsPressed.upleft = false;
      });

      this.upleftArrow.events.onInputOver.add(() => {
        this.player.btnsPressed.upleft = true;
      });

      this.upleftArrow.events.onInputOut.add(() => {
        this.player.btnsPressed.upleft = false;
      });
    }

    if (buttons.upright) {
      this.uprightArrow = this.game.add.button(this.rightX, this.upY, this.directionBitmap as any);
      this.uprightArrow.alpha = 0.3;
      this.uprightArrow.fixedToCamera = true;

      this.uprightArrow.events.onInputDown.add(() => {
        this.player.btnsPressed.upright = true;
      });

      this.uprightArrow.events.onInputUp.add(() => {
        this.player.btnsPressed.upright = false;
      });

      this.uprightArrow.events.onInputOver.add(() => {
        this.player.btnsPressed.upright = true;
      });

      this.uprightArrow.events.onInputOut.add(() => {
        this.player.btnsPressed.upright = false;
      });
    }

    if (buttons.downleft) {
      this.downleftArrow = this.game.add.button(this.leftX, this.downY, this.directionBitmap as any);
      this.downleftArrow.alpha = 0.3;
      this.downleftArrow.fixedToCamera = true;

      this.downleftArrow.events.onInputDown.add(() => {
        this.player.btnsPressed.downleft = true;
      });

      this.downleftArrow.events.onInputUp.add(() => {
        this.player.btnsPressed.downleft = false;
      });

      this.downleftArrow.events.onInputOver.add(() => {
        this.player.btnsPressed.downleft = true;
      });

      this.downleftArrow.events.onInputOut.add(() => {
        this.player.btnsPressed.downleft = false;
      });
    }

    if (buttons.downright) {
      this.downrightArrow = this.game.add.button(this.rightX, this.downY, this.directionBitmap as any);
      this.downrightArrow.alpha = 0.3;
      this.downrightArrow.fixedToCamera = true;

      this.downrightArrow.events.onInputDown.add(() => {
        this.player.btnsPressed.downright = true;
      });

      this.downrightArrow.events.onInputUp.add(() => {
        this.player.btnsPressed.downright = false;
      });

      this.downrightArrow.events.onInputOver.add(() => {
        this.player.btnsPressed.downright = true;
      });

      this.downrightArrow.events.onInputOut.add(() => {
        this.player.btnsPressed.downright = false;
      });
    }

    if (buttons.action) {
      const actionX = this.game.width - this.edgeDistance - this.sizeActionBtn;
      const actionY = this.game.height - this.edgeDistance - this.btnW - this.btnH;
      this.actionButton = this.game.add.button(actionX, actionY, this.actionBitmap as any);
      this.actionButton.alpha = 0.5;
      this.actionButton.fixedToCamera = true;

      this.actionButton.events.onInputDown.add(() => {
        player.btnsPressed.action = true;
      });

      this.actionButton.events.onInputUp.add(() => {
        player.btnsPressed.action = false;
      });
    }
  }
}
