export interface IDot {
    x: number;
    y: number;
    size: number;
    gap: number;
    colorInactive: string;
    colorActive: string;
    active: boolean;
    hovered: boolean;
    fadeDelay: number;
    onMouseIn: Function;
    onMouseOut: Function;
}

export class Dot implements IDot {
    x: number;
    y: number;
    size: number;
    gap: number;
    colorInactive: string;
    colorActive: string;
    active: boolean;
    hovered: boolean;
    fadeDelay: number;

    constructor( x: number, y: number, size: number, gap: number, colorInactive: string, colorActive: string, fadeDelay: number) {
        this.x = x
        this.y = y;
        this.size = size;
        this.gap = gap;
        this.colorInactive = colorInactive;
        this.colorActive = colorActive;
        this.fadeDelay = fadeDelay;
        this.active = false
        this.hovered = false
    }

    onMouseIn(){
        this.active = true;
        this.hovered = true;
    }

    onMouseOut() {
        this.active = false;
        this.hovered = true;
    }
}


