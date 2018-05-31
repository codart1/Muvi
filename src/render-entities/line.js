import * as PIXI from "pixi.js";
import BaseRenderEntity from "./base-render-entity";

export default class Line extends BaseRenderEntity {
    graphic = null
    padX = 0.1
    cache = []
    
    init() {
        this.graphic = new PIXI.Graphics()
        this.visualizer.stage.addChild(this.graphic);
    }
    
    onTick(delta) {
        // this.doStraightLine()
        this.doCircularLine()
    }

    doCircularLine() {
        const data = this.visualizer.data;

        const { width, height } = this.app.screen,
            cenX = width / 2,
            cenY = height / 2,
            radius = 100,
            inscrement = 2 * Math.PI / data.length;

        this.graphic.clear()
        this.graphic.lineStyle(1, 0xff1d1d, 1, 0.5)


        data.forEach((item, i) => {
            const radian = inscrement * i
            const x = cenX + (radius + item) * Math.cos(radian);
            const y = cenY + (radius + item) * Math.sin(radian);

            this.cache[i] = {x, y}

            if(i === 0) {
                this.graphic.moveTo(x, y)
                this.graphic.beginFill(0xff1d1d, 0.3)
                return
            }
    
            this.graphic.arcTo(
                this.cache[i - 1].x, this.cache[i - 1].y,
                x, y,
                3
            )
            
            if(data.length - 1 === i) {
                this.graphic.arcTo(
                    x, y,
                    this.cache[0].x, this.cache[0].y,
                    3
                )

                this.graphic.endFill()
            }
        });
    }
    
    doStraightLine() {
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