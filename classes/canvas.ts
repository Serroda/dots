export interface ICanvas {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    columns: number;
    rows: number;
    itemSize: number;
    dots: IDot[];
    addDot: Function;
    paintDot: Function;
    searchAndPaint: Function;
    removeDot: Function
    clearDot: Function
    clearSurface: Function;
}

const { hexToHsl } = useStyleControl();

export class CustomCanvas implements ICanvas {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    columns: number;
    rows: number
    itemSize: number;
    dots: IDot[] = [];

    constructor(canvas: HTMLCanvasElement, width: number, height: number, itemSize: number, pixelRatio: number) {

        this.canvas = canvas;
        this.width = width;
        this.height = height;
        this.itemSize = itemSize;

        this.columns = Math.floor(this.width / this.itemSize);
        this.rows = Math.floor(this.height / this.itemSize);

        this.canvas.width = this.width * pixelRatio;
        this.canvas.height = this.height * pixelRatio;

        this.canvas.style.width = `${this.width}px`;
        this.canvas.style.height = `${this.height}px`;

        this.ctx = this.canvas.getContext('2d')!
        this.ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    };

    addDot(dot: IDot) {
        this.dots.push(dot)
        this.paintDot(dot, dot.colorInactive)
    }

    removeDot(dot: IDot) {
        const index = this.dots.findIndex(dotItem => dotItem === dot)
        this.dots.splice(index, 1)
        this.clearDot(dot)
    }

    paintDot(dot: IDot, color: string) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(dot.x, dot.y, dot.size / 2, 0, 2 * Math.PI);
        this.ctx.fill();
    }

    clearDot(dot: IDot) {
        this.ctx.clearRect(dot.x - this.itemSize / 2, dot.y - this.itemSize / 2, this.itemSize, this.itemSize)
    }

    searchAndPaint(clientX: number, clientY: number) {
        const dot = this.dots.find(dot =>
            dot.x - this.itemSize / 2 <= clientX &&
            clientX <= dot.x + this.itemSize / 2 &&
            dot.y - this.itemSize / 2 <= clientY &&
            clientY <= dot.y + this.itemSize / 2
        );
       
        this.dots.forEach(itemDot => itemDot.active = false)

        if (dot) {
            dot.onMouseIn();
        } 

        this.updateSurface();
    }

    clearSurface() {
        this.ctx.clearRect(0, 0, this.width, this.height)
    }

    updateSurface() {
        for (const dot of this.dots) {
            this.clearDot(dot)
            if (dot.active) {
                this.paintDot(dot, dot.colorActive)
            } else if (dot.hovered) {
                const { h, s } = hexToHsl(dot.colorActive)
                this.paintDot(dot, 'HSL(' + h + ', ' + s + '%, 35%)')
            } else {
                this.paintDot(dot, dot.colorInactive)
            }
        }

    }
}

