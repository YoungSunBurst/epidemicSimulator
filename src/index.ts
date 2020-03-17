import {Circle, colorState} from './circle';
import {Graph} from './graph';

const canvasEl: HTMLCanvasElement = document.getElementById(
  'canvas'
) as HTMLCanvasElement;
const graphCanvasEl: HTMLCanvasElement = document.getElementById(
    'graph_canvas'
) as HTMLCanvasElement;

const renderingContext = canvasEl.getContext('2d')!;
const graphRenderingContext = graphCanvasEl.getContext('2d')!;


const LENGTH = 100;
const circles: Circle[] = [];
for(let i = 0; i < LENGTH; i++) {
    const circle = new Circle();
    circles.push(circle);
}

circles[0].state = colorState.infected;

const graph = new Graph();

const getCount = () => {
    return circles.reduce((v: number, c: Circle) => {
        if (c.state === colorState.infected) {
            v += 1;
        }
        return v;
    }, 0);
};

const onGraphDraw = () => {
    graph.draw(graphRenderingContext, getCount());
};

let refreshDrawIndex = 0;

const onDraw = () => {
    renderingContext.clearRect(0,0, 1000, 1000);
    circles.forEach(c => c.move());
    circles.forEach(c => c.draw(renderingContext));
    circles.forEach(c => circles.forEach(v => v !== c && c.iscollision(v) && c.collide(v)));
    if (refreshDrawIndex++ > 2) {
        onGraphDraw();
        refreshDrawIndex = 0;
    }
    requestAnimationFrame(onDraw);
};


onGraphDraw();
requestAnimationFrame(onDraw);
