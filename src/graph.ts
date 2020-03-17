const TOTALCOUNT = 100;
const HEIGHT = TOTALCOUNT * 2;


export class Graph {
    private index: number = 0;

    public draw(renderingContext: CanvasRenderingContext2D, infectedCount: number) {
        renderingContext.beginPath();
        renderingContext.moveTo(this.index, HEIGHT);
        renderingContext.strokeStyle = '#FF0000';
        renderingContext.lineWidth = 2;
        renderingContext.lineTo(this.index, HEIGHT - infectedCount);
        renderingContext.stroke();
        this.index += 2;
    }

    // public drawInfected() {
    //
    // }

}