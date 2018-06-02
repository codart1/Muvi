import * as PIXI from "pixi.js";
import { hslToInt } from "../utils";
import BaseRenderEntity from "./base-render-entity";

function createTexture() {
  const graphics = new PIXI.Graphics();

  graphics.lineStyle(0);
  graphics.beginFill(0xffffff, 1);
  graphics.drawCircle(0, 0, 3);
  graphics.endFill();

  return graphics.generateCanvasTexture();
}

function createCircle(cont, trailLength = 15) {
  const circle = new PIXI.Sprite(texture);
  const trails = [...Array(trailLength).keys()].map(v => {
    const trail = new PIXI.Sprite(texture);
    cont.addChild(trail);
    return trail;
  });

  circle.doTrail = () => {
    trails.forEach((item, i) => {
      if (i + 1 === trailLength) {
        item.x = circle.x;
        item.y = circle.y;
        return;
      }
      item.x = trails[i + 1].x;
      item.y = trails[i + 1].y;
    });
  };

  return { circle, trails };
}

const texture = createTexture();

export default class Circles extends BaseRenderEntity {
  periodicRad = 0;
  periodicRadInscreament = 2 * Math.PI / 300;

  group = new PIXI.Container();

  init() {
    const { center, radius, n, inscrement } = this.caculatedFactors;

    this.circles = [];
    for (let i = 0; i < n; i++) {
      const radian = inscrement * i,
        HSL = [360 / n * i, 1, 0.6],
        color = hslToInt(...HSL);
      const { circle, trails } = createCircle(this.group);

      circle.x = center.x + radius * Math.cos(radian);
      circle.y = center.y + radius * Math.sin(radian);
      circle.anchor.set(0.5);
      circle.tint = color;
      circle.alpha = 0.8;

      trails.forEach((item, i) => {
        const scale = 1 / trails.length * i;

        item.tint = color;
        item.anchor.set(0.5);
        item.alpha = 1;
        item.scale.set(scale, scale);
      });

      circle.doTrail();

      this.circles.push(circle);
    }

    this.group.addChild(...this.circles);

    this.visualizer.stage.addChild(this.group);
  }

  onTick(delta) {
    const data = this.visualizer.data;
    const { center, radius, inscrement } = this.caculatedFactors;

    data.forEach((value, i) => {
      const circle = this.circles[i];
      const radian = inscrement * i;
      const distance = radius + this.averageValue * 0.5 + value * 1.2;

      circle.x = center.x + distance * Math.cos(radian);
      circle.y = center.y + distance * Math.sin(radian);

      circle.doTrail();
    });
  }

  get averageValue() {
    const data = this.visualizer.data;

    return (
      data.reduce((prev, curr, i) => {
        return prev + curr;
      }, 0) / data.length
    );
  }

  get caculatedFactors() {
    const { width, height } = this.app.screen;
    const center = { x: width / 2, y: height / 2 },
      radius = width > height ? height / 8 : width / 8,
      n = this.visualizer.analyser.data.length,
      inscrement = 2 * Math.PI / n;
    return {
      center,
      radius,
      n,
      inscrement
    };
  }
}
