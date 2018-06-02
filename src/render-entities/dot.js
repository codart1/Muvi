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
  dots      = [];
  texture   = createTexture();
  container = new PIXI.Container();
  MAX_VAL   = 150;

  init() {
    const data              = this.visualizer.data;
    const { width, height } = this.app.screen;

    this.dots = [...Array(data.length).keys()].map(() => {
      const dot   = new PIXI.Sprite(this.texture);
            dot.x = Math.random() * width;
            dot.y = Math.random() * height;

      const dX = Math.random() * width - dot.x;
      const dY = Math.random() * height - dot.y;

      dot.angle    = Math.atan2(dX, dY);
      dot.velocity = 50;

      return dot;
    });

    this.container.addChild(...this.dots);

    this.visualizer.stage.addChild(this.container);
  }

  onTick(delta) {
    const deltaSecond       = delta / 1000;
    const data              = this.visualizer.data;
    const { width, height } = this.app.screen;

    this.dots.forEach((item, i) => {
      const value = data[i],
            v     = (item.velocity + value * 10) * deltaSecond,
            alpha = value > this.MAX_VAL ? 1 : 1 / this.MAX_VAL * value;

      item.x += v * Math.cos(item.angle);
      item.y += v * Math.sin(item.angle);

      item.alpha = alpha;
      // item.scale.set(alpha * 4 + 1, alpha * 4 + 1);

      if (item.x > width) {
        item.x = 0;
      } else if (item.x < 0) {
        item.x = width;
      }

      if (item.y > height) {
        item.y = 0;
      } else if (item.y < 0) {
        item.y = height;
      }
    });
    // const {x, y, velocity} = this.dots[0]
    // console.log({x, y, velocity, deltaSecond})
  }
}
