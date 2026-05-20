import { Application } from "pixi.js";

import { GameModel } from "./game/GameModel";
import "@esotericsoftware/spine-pixi-v8";
import { CONFIG } from "./config";
import { GameUI } from "./ui/GameUI";
import { ReelView } from "./game/ReelView";
import { SpineCharacter } from "./spine/SpineCharacter";

async function main() {
  const app = new Application();

  await app.init({
    width: CONFIG.WIDTH,
    height: CONFIG.HEIGHT,
    backgroundColor: 0x1a1a2e,
  });

  document.getElementById("app")!.appendChild(app.canvas);

  const model = new GameModel();
  const reelView = new ReelView();
  const ui = new GameUI(model);
  const spine = new SpineCharacter();

  reelView.init(app);
  ui.init(app);
  await spine.load(app);

  model.on("spinning", () => spine.run());
  model.on("win", () => spine.win());
  model.on("lose", () => spine.lose());
  model.on("idle", () => spine.idle());

  model.on("result", (data) => {
    const { grid } = data as { grid: string[][] };
    reelView.updateGrid(grid);
  });
}

main();
