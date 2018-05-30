import * as PIXI from "pixi.js";
import BaseRenderEntity from "./base-render-entity";

function createTexture() {
  const graphics = new PIXI.Graphics();

  graphics.lineStyle(0);
  graphics.beginFill(0xffffff, 1);
  graphics.drawCircle(0, 0, 3);
  graphics.endFill();

  return graphics.generateCanvasTexture();
}

function createCircle() {
  const circle = new PIXI.Sprite(texture);
  return circle;
}

const texture = createTexture();

export default class Circles extends BaseRenderEntity {
  periodicRad = 0;
  periodicRadInscreament = 2 * Math.PI / 300;

  // effectSprite = new PIXI.Sprite();
  // previousGroupTexture = null;
  group = new PIXI.Container();

  init() {
    const { center, radius, n, inscrement } = this.caculatedFactors;

    this.circles = [];
    for (let i = 0; i < n; i++) {
      const radian = inscrement * i;
      const circle = createCircle();

      circle.x = center.x + radius * Math.cos(radian);
      circle.y = center.y + radius * Math.sin(radian);
      circle.anchor.set(0.5);
      circle.tint = Math.random() * 0xffffff;
      circle.alpha = 0.5;

      this.circles.push(circle);
    }

    this.group.addChild(this.effectSprite);
    this.group.addChild(...this.circles);

    this.visualizer.stage.addChild(this.group);
  }

  onTick(delta) {
    const data = this.visualizer.data;
    const { center, radius, inscrement } = this.caculatedFactors;
    // this.periodicRad += this.periodicRadInscreament;

    data.forEach((value, i) => {
      const circle = this.circles[i];
      const radian = inscrement * i;
      circle.x = center.x + (radius + value) * Math.cos(radian);
      circle.y = center.y + (radius + value) * Math.sin(radian);
    });

    // if (!this.previousGroupTexture) {
    //   this.previousGroupTexture = this.app.renderer.generateTexture(this.group);
    // }

    // if (this.app.ticker.elapsedMS % 100 == 0) {
    // const temp = this.effectSprite.texture;

    // this.effectSprite.texture = this.previousGroupTexture;

    // this.group.alpha = 0.9;
    // this.previousGroupTexture = this.app.renderer.generateTexture(this.group);
    // this.group.alpha = 1;

    // temp.destroy();
    // }

    // }
  }

  get caculatedFactors() {
    const { width, height } = this.app.screen;
    const center = { x: width / 2, y: height / 2 },
      radius = width > height ? height / 6 : width / 6,
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
