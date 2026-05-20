import { CONFIG } from "../config";

export class WinEvaluator {
  evaluate(grid: string[][]): {
    hasWin: boolean;
    totalWin: number;
    winLines: number[][];
  } {
    let totalWin = 0;
    const winLines: number[][] = [];

    for (const line of CONFIG.WIN_LINES) {
      const symbols = line.map((row, col) => grid[col][row]);
      const first = symbols[0];

      if (symbols.every((s) => s === first)) {
        totalWin += CONFIG.PAYTABLE[first as keyof typeof CONFIG.PAYTABLE] ?? 0;
        winLines.push(line as unknown as number[]);
      }
    }

    return {
      hasWin: totalWin > 0,
      totalWin,
      winLines,
    };
  }
}
