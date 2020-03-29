import './styles.scss';
import {Circle} from './Circle';
import {Graph} from './Graph';
import {colorState, getCount} from './Common';
import {StatusView} from './StatusView';

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
    const circle = new Circle(circles);
    circles.push(circle);
}
//
// circles[0] = new Circle(10, 10, 2, 2);
//
// circles[1] = new Circle(200, 205, 0, 0);

circles[0].state = colorState.infected;

const graph = new Graph();
let refreshDrawIndex = 0;

const onStart = () => {
    requestAnimationFrame(onPaint);
};

const statusView = new StatusView(onStart);

const onPaint = () => {
    renderingContext.clearRect(0,0, 1000, 1000);

    circles.forEach(c => {
        circles.forEach(v => v !== c && c.iscollision(v) && c.collide(v));
    });
    circles.forEach( c => {
        c.move();
        c.passTime();
        c.draw(renderingContext);
    });
    const infectedCount = getCount(circles, colorState.infected);
    const recoveredCount = getCount(circles, colorState.recovered);
    if (refreshDrawIndex++ > 2) {
        graph.draw(graphRenderingContext, infectedCount, recoveredCount);
        refreshDrawIndex = 0;
    }
    statusView.updateResult(infectedCount, recoveredCount);
    requestAnimationFrame(onPaint);
};

circles.forEach(c => {
    c.draw(renderingContext);
});
graph.draw(graphRenderingContext, 1, 0);
