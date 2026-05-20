import { Application, Container, Graphics, Text } from "pixi.js";
import { GameModel } from "../game/GameModel";

export class GameUI {
  private _container: Container = new Container();
  private _balanceText: Text;
  private _betText: Text;
  private _winText: Text;
  private _spinButton: Graphics;
  private _model: GameModel;

  constructor(model: GameModel) {
    this._model = model;
    this._spinButton = new Graphics();
    this._balanceText = new Text({
      text: "",
      style: { fontSize: 20, fill: 0xffffff },
    });
    this._betText = new Text({
      text: "",
      style: { fontSize: 20, fill: 0xffffff },
    });
    this._winText = new Text({
      text: "",
      style: { fontSize: 28, fill: 0xffd700 },
    });
  }

  init(app: Application) {
    this._balanceText.x = 20;
    this._balanceText.y = 520;
    this._updateBalance();

    this._betText.x = 20;
    this._betText.y = 550;
    this._updateBet();

    this._winText.x = 200;
    this._winText.y = 520;
    this._winText.visible = false;

    this._spinButton.roundRect(580, 510, 160, 60, 10);
    this._spinButton.fill(0xe74c3c);
    this._spinButton.interactive = true;
    this._spinButton.cursor = "pointer";
    this._spinButton.on("pointerdown", () => this._model.spin());

    const buttonText = new Text({
      text: "SPIN",
      style: { fill: 0xffffff, fontSize: 24 },
    });
    buttonText.x = 638;
    buttonText.y = 525;

    this._container.addChild(
      this._balanceText,
      this._betText,
      this._winText,
      this._spinButton,
      buttonText,
    );

    app.stage.addChild(this._container);
    this._buildEvents();
  }

  private _buildEvents() {
    this._model.on("spinning", () => {
      this._winText.visible = false;
      this._updateBalance();
    });

    this._model.on("result", (data) => {
      const { totalWin } = data as { totalWin: number };
      this._updateBalance();

      if (totalWin > 0) {
        this._winText.text = `WIN: ${totalWin}`;
        this._winText.visible = true;
      }
    });

    this._model.on("noFunds", () => {
      this._winText.text = "NO FUNDS!";
      this._winText.visible = true;
    });
  }

  private _updateBalance() {
    this._balanceText.text = `Balance: ${this._model.balance}`;
  }

  private _updateBet() {
    this._betText.text = `Bet: ${this._model.bet}`;
  }
}
