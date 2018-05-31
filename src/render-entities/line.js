import * as PIXI from "pixi.js";
import BaseRenderEntity from "./base-render-entity";

export default class Line extends BaseRenderEntity {
    graphic = null
    padX = 0.1
    
    init() {
        this.graphic = new PIXI.Graphics()
        this.visualizer.stage.addChild(this.graphic);
    }
    
    onTick(delta) {
        const { width, height } = this.app.screen,
                middleY = height / 2,
                startX = width * this.padX,
                lineWidth = width - startX * 2;

        this.graphic.clear()

        this.graphic.lineStyle(1, 0xff1d1d, 1, 0.5)
        const data = this.visualizer.data;
        
        data.forEach((item, i) => {
            if(i === 0) {
                this.graphic.moveTo(startX, middleY - item)
                return
            }

            this.graphic.arcTo(
                startX + lineWidth/data.length * (i - 1), middleY - data[i-1],
                startX + lineWidth/data.length * i, middleY - item,
                3
            )
        });
    }
}