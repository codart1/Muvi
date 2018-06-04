import * as PIXI from "pixi.js";
import { hslToInt } from "../utils";
import BaseRenderEntity from "./base-render-entity";

function createTexture() {
  const graphics = new PIXI.Graphics();

  graphics.lineStyle(0);
  graphics.beginFill(0xffffff, 1);
  graphics.drawCircle(0, 0, 4);
  graphics.endFill();

  return graphics.generateCanvasTexture();
}

function createCircle(cont, trailLength = 25) {
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

  brt = new PIXI.BaseRenderTexture(this.app.screen.width, this.app.screen.height, PIXI.SCALE_MODES.LINEAR, 1);
  rt = new PIXI.RenderTexture(this.brt);
  mirrorSprite = new PIXI.Sprite(this.rt)

  group = new PIXI.Container();

  init() {
    const { center, radius, n, inscrement } = this.caculatedFactors;
    const { width, height } = this.app.screen;

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
      circle.blendMode = PIXI.BLEND_MODES.SCREEN;

      trails.forEach((item, i) => {
        const scale = 1 / trails.length * i;

        item.tint = color;
        item.anchor.set(0.5);
        item.alpha = 1;
        item.scale.set(scale, scale);
        item.blendMode = PIXI.BLEND_MODES.SCREEN;
      });

      circle.doTrail();

      this.circles.push(circle);
    }

    this.group.addChild(...this.circles);
    
    this.visualizer.stage.addChild(this.group);
    this.visualizer.stage.addChild(this.mirrorSprite);

    this.mirrorSprite.anchor.set(.5, .5)
    this.mirrorSprite.x = width / 2
    this.mirrorSprite.y = height / 2
    this.mirrorSprite.scale.x = -1
    // this.mirrorSprite.blendMode = PIXI.BLEND_MODES.OVERLAY
  }

  onTick(delta) {
    const data = this.visualizer.data;
    const { center, radius, inscrement } = this.caculatedFactors;

    data.forEach((value, i) => {
      const circle = this.circles[i];
      const radian = inscrement * i + Math.PI/2;
      const distance = radius + this.averageVal * 0.5 + value;

      circle.x = center.x + distance * Math.cos(radian);
      circle.y = center.y + distance * Math.sin(radian);

      circle.doTrail();
    });

    this.visualizer.renderer.render(this.group, this.rt)
  }

  get caculatedFactors() {
    const { width, height } = this.app.screen;
    const center = { x: width / 2, y: height / 2 },
      radius = width > height ? height / 12 : width / 12,
      n = this.visualizer.analyser.data.length,
      inscrement = Math.PI / n + Math.PI / 5;
    return {
      center,
      radius,
      n,
      inscrement
    };
  }
}
