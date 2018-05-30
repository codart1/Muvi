import * as PIXI from "pixi.js";
import BaseRenderEntity from "./base-render-entity";

export default class Debugger extends BaseRenderEntity {
  init() {
    var style = new PIXI.TextStyle({
      fontFamily: "Arial",
      fontSize: 12,
      fill: ["#ffffff", "#00ff99"], // gradient
      wordWrap: true,
      wordWrapWidth: 440
    });

    this.FPS = new PIXI.Text(`FPS is: ${this.visualizer.FPS}`, style);

    this.FPS.x = 30;
    this.FPS.y = 90;

    this.visualizer.stage.addChild(this.FPS);
  }

  onTick = delta => {
    this.FPS.text = `FPS is: ${this.visualizer.FPS}`;
  };
}
