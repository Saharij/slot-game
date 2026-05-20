import { EventEmitter } from "../core/EventEmitter";
import { StateMachine, type State } from "../core/StateMachine";
import { ReelModel } from "./ReelModel";
import { WinEvaluator } from "./WinEvaluator";

export class GameModel extends EventEmitter {
  private _reel: ReelModel;
  private _state: StateMachine;
  private _evaluator: WinEvaluator;
  private _balance: number = 1000;
  private _bet: number = 10;

  constructor() {
    super();
    this._reel = new ReelModel();
    this._state = new StateMachine();
    this._evaluator = new WinEvaluator();

    this._state
      .addTransition("idle", "spinning", () => this.emit("spinning"))
      .addTransition("spinning", "win", () => this.emit("win"))
      .addTransition("spinning", "lose", () => this.emit("lose"))
      .addTransition("win", "idle", () => this.emit("idle"))
      .addTransition("lose", "idle", () => this.emit("idle"));
  }

  get balance(): number {
    return this._balance;
  }

  get bet(): number {
    return this._bet;
  }

  get state(): State {
    return this._state.current;
  }

  spin(): void {
    if (this._state.current !== "idle") {
      return;
    }

    if (this._balance < this._bet) {
      this.emit("noFunds");
      return;
    }

    this._balance -= this._bet;
    this._state.transition("spinning");

    this._reel.spin();
    const grid = this._reel.getResult();
    const { hasWin, totalWin, winLines } = this._evaluator.evaluate(grid);

    setTimeout(() => {
      if (hasWin) {
        this._balance += totalWin;
        this._state.transition("win");
        this.emit("result", { grid, totalWin, winLines });
      } else {
        this._state.transition("lose");
        this.emit("result", { grid, totalWin: 0, winLines: [] });
      }
    }, 2200);
  }
}
