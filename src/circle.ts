import {mat2} from 'gl-matrix';

const CANVAS_SIZE = 1000;
const MAX_SPEED = 5;
const RADIUS = 10;
const END_LIMIT = (CANVAS_SIZE - (RADIUS * 2));


export enum colorState {
    alive = 'alive',
    infected = 'infected',
    recovered = 'recovered',
    dead = 'dead',
}

const COLOR_MAP: { [key in keyof typeof colorState]: string } = {
    alive: '#0000FF',
    infected: '#FF0000',
    recovered: '#00FF00',
    dead: '#D8DBE3',
};

console.log('aa', COLOR_MAP);


export class Circle {
    private _x: number = Math.round(END_LIMIT * Math.random()) + RADIUS;
    private _y: number = Math.round(END_LIMIT * Math.random()) + RADIUS;
    private _r: number = RADIUS;

    private _mvX: number = Math.round(MAX_SPEED * (0.5 - Math.random()));
    private _mvY: number = Math.round(MAX_SPEED * (0.5 - Math.random()));
    private _state: colorState = colorState.alive;

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
        if (this._state !== colorState.dead && circle.state !== colorState.dead) {
            this._state = (this._state === colorState.infected || circle._state === colorState.infected) ? colorState.infected : colorState.alive;
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

    public draw(renderingContext: CanvasRenderingContext2D) {
        renderingContext.beginPath();
        renderingContext.fillStyle = COLOR_MAP[this._state];
        renderingContext.arc(this._x, this._y, this._r, 0, Math.PI * 2, false);
        renderingContext.stroke();
        renderingContext.fill();


        // renderingContext.moveTo(this._x, this._y);
    }
}
