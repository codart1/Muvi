import BaseRenderEntity from "./base-render-entity";
import { Graphics, BLEND_MODES, Container } from "pixi.js";

export default class Shape extends BaseRenderEntity {
  triangle = new Graphics();
  triangleContainer = new Container()

  init() {
    const { width, height } = this.app.screen;
    // this.triangle.blendMode = BLEND_MODES.ADD;


    this.triangleContainer.addChild(this.triangle)
    this.visualizer.stage.addChild(this.triangleContainer);

    
    this.triangleContainer.pivot.x = width / 2
    this.triangleContainer.pivot.y = height / 2
  }

  onTick() {
    const { width, height } = this.app.screen;
    const longestDimension = width > height? width : height
    const power = longestDimension / 13 + this.averageVal

    this.triangle.clear();
    this.triangle.lineStyle(1.5, 0xffffff, 0.05, 0.5);

    this.triangle.drawRect(0, 0, power, power);


    // this.triangle.position.x = width / 2 - this.triangle.width / 2;
    // this.triangle.position.y = height / 2 - this.triangle.height / 2;

    // this.triangle.rotation += .2;
  }
}
