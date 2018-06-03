export default class BaseRenderEntity {
  averageVal = null;

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

  doTick(delta) {
    this.averageVal = this.caculateAverage();
    this.onTick(delta);
  }

  caculateAverage() {
    const data = this.visualizer.data;
    return (
      data.reduce((prev, curr, i) => {
        return prev + curr;
      }, 0) / data.length
    );
  }

  get app() {
    return this.visualizer.app;
  }
}
