import { CONFIG } from "../config";
import { EventEmitter } from "../core/EventEmitter";

export class ReelModel extends EventEmitter {
  private _strips: string[][] = [];

  constructor() {
    super();
    this._generateStrips();
  }

  private _generateStrips(): void {
    for (let i = 0; i < CONFIG.REELS; i++) {
      const strip: string[] = [];

      for (let j = 0; j < CONFIG.REEL_STRIP; j++) {
        const randomIndex = Math.floor(Math.random() * CONFIG.SYMBOLS.length);
        strip.push(CONFIG.SYMBOLS[randomIndex]);
      }

      this._strips.push(strip);
    }
  }

  getStrip(reelIndex: number): string[] {
    return this._strips[reelIndex];
  }

  getResult(): string[][] {
    return this._strips.map((strip) => strip.slice(0, CONFIG.ROWS));
  }

  spin(): void {
    this._generateStrips();
    this.emit("spinComplete", this.getResult());
  }
}
