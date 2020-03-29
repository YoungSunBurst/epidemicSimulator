import {StatusData} from './Data';
import {TOTALCOUNT} from './Common';

export class StatusView {
    private _optionEl: HTMLDivElement;
    private _startEl: HTMLButtonElement;
    private _recoverable_date: HTMLInputElement;
    private _cure_rate: HTMLInputElement;
    private _resultEl: HTMLDivElement;
    private _recovered_count: HTMLSpanElement;
    private _healthy_count: HTMLSpanElement;
    private _infected_count: HTMLSpanElement;
    private _startFunc: () => void;

    constructor(startFn: () => void) {
        this._optionEl = document.getElementById('option') as HTMLDivElement;
        this._startEl = document.getElementById('start') as HTMLButtonElement;
        this._recoverable_date = document.getElementById('recoverable_date') as HTMLInputElement;
        this._cure_rate = document.getElementById('cure_rate') as HTMLInputElement;
        this._resultEl = document.getElementById('result') as HTMLDivElement;
        this._recovered_count = document.getElementById('recovered_count') as HTMLSpanElement;
        this._healthy_count = document.getElementById('healthy_count') as HTMLSpanElement;
        this._infected_count = document.getElementById('infected_count') as HTMLSpanElement;
        this._startFunc = startFn;
        this._startEl.addEventListener('click', this._clickStart.bind(this));
    }

    private _clickStart() {
        StatusData.RECOVERABLE_DATE = parseFloat(this._recoverable_date.value);
        StatusData.CURE_RATE = parseFloat(this._cure_rate.value);
        this._optionEl.style.display = 'none';
        this._resultEl.style.display = 'block';
        this._startEl.removeEventListener('click', this._clickStart.bind(this));
        this._startFunc();
    }

    public updateResult(infectedCount: number, recoveredCount: number) {
        this._recovered_count.innerText = recoveredCount + '';
        this._healthy_count.innerText = (TOTALCOUNT - infectedCount - recoveredCount) + '';
        this._infected_count.innerText = infectedCount + '';
    }
}