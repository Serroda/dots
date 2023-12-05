export interface IDot {
    x: number;
    y: number;
    size: number;
    gap: number;
    color: string;
}

export class Dot implements IDot {
    x: number;
    y: number;
    size: number;
    gap: number;
    color: string;
    constructor( x: number, y: number, size: number, gap: number, color: string) {
        this.x = x
        this.y = y;
        this.size = size;
        this.gap = gap;
        this.color = color;
    }
}


