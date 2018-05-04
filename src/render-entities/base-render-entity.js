export default class BaseRenderEntity {
  constructor(visualizer) {
    this.visualizer = visualizer;
  }

  init() {
    console.log("please implement init");
  }

  onTick() {
    console.log("please implement onTick");
  }

  onDestroy() {
    console.log("please implement onDestroy");
  }

  get app() {
    return this.visualizer.app;
  }
}
