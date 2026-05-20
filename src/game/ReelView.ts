import { Application, Container, Graphics, Text } from "pixi.js";
import { CONFIG } from "../config";

export class ReelView {
  private _container: Container = new Container();
  private _symbolTexts: Text[][] = [];
  private _mask: Graphics = new Graphics();

  init(app: Application): void {
    const offsetX = 80;
    const offsetY = 80;

    this._mask.rect(
      offsetX,
      offsetY,
      CONFIG.REELS * CONFIG.REEL_WIDTH,
      CONFIG.ROWS * CONFIG.SYMBOL_SIZE,
    );
    this._mask.fill({ color: 0xffffff });

    app.stage.addChild(this._mask);

    for (let col = 0; col < CONFIG.REELS; col++) {
      const reelSymbols: Text[] = [];

      for (let row = 0; row < CONFIG.ROWS; row++) {
        const text = new Text({
          text: CONFIG.SYMBOLS[0],
          style: { fontSize: 64 },
        });

        text.x = offsetX + col * CONFIG.REEL_WIDTH;
        text.y = offsetY + row * CONFIG.SYMBOL_SIZE;

        this._container.addChild(text);

        reelSymbols.push(text);
      }

      this._symbolTexts.push(reelSymbols);
    }

    this._container.mask = this._mask;
    app.stage.addChild(this._container);
  }

  updateGrid(grid: string[][]): void {
    for (let col = 0; col < CONFIG.REELS; col++) {
      for (let row = 0; row < CONFIG.ROWS; row++) {
        this._symbolTexts[col][row].text = grid[col][row];
      }
    }
  }
}
