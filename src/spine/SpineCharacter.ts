import { Application, Assets } from "pixi.js";
import { Spine } from "@esotericsoftware/spine-pixi-v8";
import { CONFIG } from "../config";

export class SpineCharacter {
  private _spine: Spine | null = null;

  async load(app: Application): Promise<void> {
    Assets.add({
      alias: "spineboy",
      src: CONFIG.SPINE.PATH,
      parser: "loadJson",
    });
    Assets.add({
      alias: "spineboyAtlas",
      src: CONFIG.SPINE.ATLAS,
      parser: "loadTxt",
    });
    await Assets.load(["spineboy", "spineboyAtlas"]);

    this._spine = Spine.from({
      skeleton: "spineboy",
      atlas: "spineboyAtlas",
    });

    this._spine.scale.set(CONFIG.SPINE.SCALE);
    this._spine.x = CONFIG.SPINE.X;
    this._spine.y = CONFIG.SPINE.Y;

    app.stage.addChild(this._spine);
    this.idle();
  }

  idle(): void {
    this._spine?.state.setAnimation(0, "idle", true);
  }

  run(): void {
    this._spine?.state.setAnimation(0, "run", true);
  }

  win(): void {
    this._spine?.state.setAnimation(0, "shoot", false);
    this._spine?.state.addAnimation(0, "idle", true, 0);
  }

  lose(): void {
    this._spine?.state.setAnimation(0, "death", false);
    this._spine?.state.addAnimation(0, "idle", true, 0);
  }
}
