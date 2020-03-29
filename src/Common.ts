import {Circle} from './Circle';

export const TOTALCOUNT = 100;

export const CANVAS_SIZE = 1000;

export enum colorState {
    alive = 'alive',
    infected = 'infected',
    recovered = 'recovered',
    dead = 'dead',
}

export const COLOR_MAP: { [key in keyof typeof colorState]: string } = {
    alive: '#32C5FF',
    infected: '#B06AC3',
    recovered: '#B0E27C',
    dead: '#D8DBE3',
};

export const getCount = (circles: Circle[], state: colorState) => {
    return circles.reduce((v: number, c: Circle) => {
        if (c.state === state) {
            v += 1;
        }
        return v;
    }, 0);
};
