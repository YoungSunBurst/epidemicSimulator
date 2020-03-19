import {COLOR_MAP, colorState, TOTALCOUNT} from './Common';

const GRAPH_HEIGHT = TOTALCOUNT * 2;

export class Graph {
    private index: number = 0;

    public draw(renderingContext: CanvasRenderingContext2D, infectedCount: number, recoveredCount: number) {
        this.drawInfected(renderingContext, infectedCount);
        this.drawRecovered(renderingContext, recoveredCount);

        this.index += 2;
    }

    public drawInfected(renderingContext: CanvasRenderingContext2D, infectedCount: number) {
        renderingContext.beginPath();
        renderingContext.moveTo(this.index, GRAPH_HEIGHT);
        renderingContext.strokeStyle = COLOR_MAP[colorState.infected];
        renderingContext.lineWidth = 2;
        renderingContext.lineTo(this.index, GRAPH_HEIGHT - (infectedCount * 2));
        renderingContext.stroke();
    }

    public drawRecovered(renderingContext: CanvasRenderingContext2D, recoveredCount: number) {
        renderingContext.beginPath();
        renderingContext.moveTo(this.index, 0);
        renderingContext.strokeStyle = COLOR_MAP[colorState.recovered];
        renderingContext.lineWidth = 2;
        renderingContext.lineTo(this.index, (recoveredCount * 2));
        renderingContext.stroke();
    }
}