import {CANVAS_SIZE, COLOR_MAP, colorState} from './Common';
import {StatusData} from './Data';

const MAX_SPEED = 5;
const RADIUS = 10;
const END_LIMIT = (CANVAS_SIZE - (RADIUS * 2));
//
// const RECOVERABLE_DATE = 200;
// const CURE_RATE = 0.001;

export class Circle {
    private _x: number = Math.round(END_LIMIT * Math.random()) + RADIUS;
    private _y: number = Math.round(END_LIMIT * Math.random()) + RADIUS;
    private _r: number = RADIUS;

    private _mvX: number = Math.round(MAX_SPEED * (0.5 - Math.random()));
    private _mvY: number = Math.round(MAX_SPEED * (0.5 - Math.random()));
    private _state: colorState = colorState.alive;
    private _infectedDays: number = 0;

    set x(value: number) {
        this._x = value;
    }

    get x(): number {
        return this._x;
    }

    set y(value: number) {
        this._y = value;
    }

    get y(): number {
        return this._y;
    }

    set r(value: number) {
        this._r = value;
    }

    get r(): number {
        return this._r;
    }

    set mvX(value: number) {
        this._mvX = value;
    }

    get mvX(): number {
        return this._mvX;
    }

    set mvY(value: number) {
        this._mvY = value;
    }

    get mvY(): number {
        return this._mvY;
    }

    set state(value: colorState) {
        this._state = value;
    }

    get state(): colorState {
        return this._state;
    }

    public iscollision(circle: Circle): boolean {
        return (Math.sqrt(Math.pow(circle.x - this._x, 2) + Math.pow(circle.y - this._y, 2)) < RADIUS * 2);
    }


    public collide(circle: Circle) {
        if (this._state === colorState.alive && circle._state === colorState.infected) {
            this._state = colorState.infected;
            this._infectedDays = 1;
        }
    }

    public move() {
        this._x += this._mvX;
        this._y += this._mvY;
        if (this._x < RADIUS || this._x > END_LIMIT + RADIUS) {
            this._mvX *= -1;
        } else if (this._y < RADIUS || this._y > END_LIMIT + RADIUS) {
            this._mvY *= -1;
        }
    }

    public passTime() {
        if (this.state === colorState.infected) {
            this._infectedDays++;
            if (this._infectedDays > StatusData.RECOVERABLE_DATE) {
                this._gotcha();
            }
        }
    }

    private _gotcha() {
        if (this.state === colorState.infected && Math.random() < StatusData.CURE_RATE) {
            this.state = colorState.recovered;
        }
    }

    public draw(renderingContext: CanvasRenderingContext2D) {
        renderingContext.beginPath();
        renderingContext.fillStyle = COLOR_MAP[this._state];
        renderingContext.arc(this._x, this._y, this._r, 0, Math.PI * 2, false);
        renderingContext.stroke();
        renderingContext.fill();
    }
}
