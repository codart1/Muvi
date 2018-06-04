import * as PIXI from "pixi.js";
import { Ambient, Circles, Debugger, Dot, Shape } from "./render-entities";
import {ShockwaveFilter} from '@pixi/filter-shockwave';
import {PixelateFilter} from '@pixi/filter-pixelate';

export default class Visualizer {
  renderEntities = [];

  constructor(analyser, domContainer) {
    this.analyser     = analyser;
    this.domContainer = domContainer;

    this.init();

    this.renderEntities.push(new Ambient(this));
    this.renderEntities.push(new Circles(this));
    // this.renderEntities.push(new Shape(this));
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
    this.app.renderer = PIXI.autoDetectRenderer( this.domContainer.offsetWidth, this.domContainer.offsetHeight );
    this.domContainer.appendChild(this.app.view);

    this.app.ticker.add(this.onTick, this);

    //TODO: clean filters after play
    // this.shock = new ShockwaveFilter()
    // this.shock.center = {x: this.app.screen.with / 2, x: this.app.screen.heigh / 2}
    this.stage.filters = [
      // this.shock,
      // new PixelateFilter(10)
    ]
  }

  onTick(delta) {
    this.renderEntities.forEach(item => item.doTick(delta));

    // const [x, y] = this.stage.filters[0].size
    // this.stage.filters[0].size[0] -= .1 
    // this.stage.filters[0].size[1] -= .1 
  }

  get FPS() {
    return Math.round(this.app.ticker.FPS);
  }

  get stage() {
    return this.app.stage;
  }

  get renderer() {
    return this.app.renderer;
  }

  get data() {
    return this.analyser.data;
  }
}
