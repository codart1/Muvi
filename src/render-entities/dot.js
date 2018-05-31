import * as PIXI from "pixi.js";
import BaseRenderEntity from "./base-render-entity";

function createTexture() {
  const graphics = new PIXI.Graphics();

  graphics.lineStyle(0);
  graphics.beginFill(0xffffff, 1);
  graphics.drawCircle(0, 0, 1);
  graphics.endFill();

  return graphics.generateCanvasTexture();
}

export default class Dot extends BaseRenderEntity {
  dots = [];
  texture = createTexture();
  container = new PIXI.Container();

  init() {
    const data = this.visualizer.data;
    const { width, height } = this.app.screen;

    this.dots = [...Array(data.length).keys()].map(() => {
      const dot = new PIXI.Sprite(this.texture);
      dot.x = Math.random() * width;
      dot.y = Math.random() * height;

      const dX = Math.random() * width - dot.x
      const dY = Math.random() * height - dot.y

      dot.angle = Math.atan2(dX, dY);
      dot.velocity = 400 * Math.random();

      return dot;
    });

    this.container.addChild(...this.dots);

    this.visualizer.stage.addChild(this.container);
  }

  onTick(delta) {
    const deltaSecond = delta / 1000;
    
    this.dots.forEach(item => {
      const v = item.velocity * deltaSecond

      item.x += v * Math.cos(item.angle);
      item.y += v * Math.sin(item.angle);
    });

    // const {x, y, velocity} = this.dots[0]
    // console.log({x, y, velocity, deltaSecond})
  }
}
