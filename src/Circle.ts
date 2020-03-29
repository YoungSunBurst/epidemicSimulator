import {CANVAS_SIZE, COLOR_MAP, colorState} from './Common';
import {StatusData} from './Data';
import {mat2d, vec2} from 'gl-matrix';

const MAX_SPEED = 5;
const RADIUS = 10;
const END_LIMIT = (CANVAS_SIZE - (RADIUS * 2));

export class Circle {
    private _x: number = Math.round(END_LIMIT * Math.random()) + RADIUS;
    private _y: number = Math.round(END_LIMIT * Math.random()) + RADIUS;
    private _r: number = RADIUS;

    private _mvX: number = Math.round(MAX_SPEED * (0.5 - Math.random()));
    private _mvY: number = Math.round(MAX_SPEED * (0.5 - Math.random()));
    private _state: colorState = colorState.alive;
    private _infectedDays: number = 0;
    private _lastCollideCircle: Circle | null = null;


    // constructor(x: number = Math.round(END_LIMIT * Math.random()) + RADIUS, y: number = Math.round(END_LIMIT * Math.random()) + RADIUS
    //             , mvX: number = Math.round(MAX_SPEED * (0.5 - Math.random())), mvY: number = Math.round(MAX_SPEED * (0.5 - Math.random()))) {
    //     this.x = x;
    //     this.y = y;
    //     this.mvX = mvX;
    //     this.mvY = mvY;
    // }
    constructor(circles: Circle[]) {

        while (circles.some(v => v.iscollision(this))) {
            this.x = Math.round(END_LIMIT * Math.random()) + RADIUS;
            this.y = Math.round(END_LIMIT * Math.random()) + RADIUS;
        }
    }

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
        if ((this.mvX === 0 && this.mvY === 0) || this._lastCollideCircle === circle) return;
        this._lastCollideCircle = circle;

        const x = circle.x - this.x;
        const y = circle.y - this.y;
        this.changeDirection(x, y);
    }

    public move() {
        this._x += this._mvX;
        this._y += this._mvY;
        if (this._x < RADIUS && this._mvX < 0 || this._x > END_LIMIT + RADIUS && this._mvX > 0) {
            this._mvX *= -1;
            this._lastCollideCircle = null;
        } else if (this._y < RADIUS && this._mvY < 0 || this._y > END_LIMIT + RADIUS && this._mvY > 0) {
            this._mvY *= -1;
            this._lastCollideCircle = null;
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

    public changeDirection(x: number, y: number) {
        const mat2 = mat2d.create();
        mat2d.rotate(mat2, mat2, Math.atan2(y, x));
        mat2d.multiply(mat2, mat2, mat2d.fromValues(-1, 0, 0, 1, 0, 0));
        mat2d.rotate(mat2, mat2, -Math.atan2(y, x));

        const result = vec2.transformMat2d(vec2.create(), [this._mvX, this._mvY], mat2);
        this.mvX = result[0];
        this.mvY = result[1];
    }

}
