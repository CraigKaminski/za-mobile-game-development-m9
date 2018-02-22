import { Game } from '../states/Game';
import { Item } from './Item';

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
  items: Item[];
  quests: IQuest[];
}

interface IQuest {
  name: string;
  code: string;
  isCompleted: boolean;
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

  public checkQuestCompletion(item: Item) {
    let i = 0;
    const len = this.data.quests.length;

    while (i < len) {
      if (this.data.quests[i].code === item.data.questCode) {
        this.data.quests[i].isCompleted = true;
        console.log(this.data.quests[i].name + ' has been completed');
        break;
      }
      i++;
    }
  }

  public collectItem(item: Item) {
    if (item.data.isQuest) {
      this.data.items.push(item);

      this.checkQuestCompletion(item);
    } else {
      this.data.health += item.data.health ? item.data.health : 0;
      this.data.attack += item.data.attack ? item.data.attack : 0;
      this.data.defense += item.data.defense ? item.data.defense : 0;
      this.data.gold += item.data.gold ? item.data.gold : 0;

      this.state.refreshStats();
    }
    item.kill();
  }
}
