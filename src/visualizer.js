import * as PIXI from "pixi.js";
import { Ambient, Circles, Debugger, Dot, Shape } from "./render-entities";

export default class Visualizer {
  renderEntities = [];

  constructor(analyser, domContainer) {
    this.analyser     = analyser;
    this.domContainer = domContainer;

    this.init();

    this.renderEntities.push(new Ambient(this));
    this.renderEntities.push(new Circles(this));
    this.renderEntities.push(new Shape(this));
    // this.renderEntities.push(new Line(this));
    this.renderEntities.push(new Dot(this));
    this.renderEntities.push(new Debugger(this));
    this.renderEntities.forEach(item => item.init());
  }

  init() {
    this.app = new PIXI.Application(
      this.domContainer.offsetWidth,
      this.domContainer.offsetHeight,
      {
        backgroundColor: 0x1e1821,
        antialias      : true
      }
    );
    this.domContainer.appendChild(this.app.view);

    this.app.ticker.add(this.onTick, this);
  }

  onTick(delta) {
    this.renderEntities.forEach(item => item.doTick(delta));
  }

  get FPS() {
    return Math.round(this.app.ticker.FPS);
  }

  get stage() {
    return this.app.stage;
  }

  get data() {
    return this.analyser.data;
  }
}
