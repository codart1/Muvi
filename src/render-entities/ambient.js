import * as PIXI from "pixi.js";
import { hslToInt } from "../utils";
import BaseRenderEntity from "./base-render-entity";

export default class Line extends BaseRenderEntity {
  rect         = new PIXI.Graphics();
  hslColor     = [302, 0.10, 0.10];
  huePerSecond = 100;

  init() {
    const { width, height } = this.app.screen;

    this.rect.beginFill(0xffffff);
    this.rect.drawRect(0, 0, width, height);
    this.rect.endFill();

    this.visualizer.stage.addChild(this.rect);
  }

  onTick(delta) {
    const hueShift = this.huePerSecond * (delta / 1000);

    this.hslColor[0] = this.hslColor[0] > 360 ? 0 : this.hslColor[0] + hueShift;

    this.rect.tint = hslToInt(this.hslColor);
  }
}
