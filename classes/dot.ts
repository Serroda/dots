

export interface IDot {
    x: number;
    y: number;
    size: number;
    gap: number;
    colorInactive: string;
    colorActive: string;
    colorFade: string;
    colorH: number;
    colorS: number
    colorL: number
    active: boolean;
    hovered: boolean;
    fadeDelay: number;
    onMouseIn: Function;
    onMouseOut: Function;
    updateFadeColor: Function;
}



const { hexToHsl } = useStyleControl();

function calculateNextHsl(colorNow: { h: number, s: number, l: number }, colorEnd: { h: number, s: number, l: number }) {
    const result = {
        h: colorNow.h,
        s: colorNow.s,
        l: colorNow.l
    }

    console.log({colorNow,colorEnd})

    if (colorNow.h > colorEnd.h) {
        result.h = result.h - 1
    } else if (colorNow.h < colorEnd.h) {
        result.h = result.h + 1
    }

    if (colorNow.s > colorEnd.s) {
        result.s = result.s - 1
    } else if (colorNow.s < colorEnd.s) {
        result.s = result.s + 1
    }


    if (colorNow.l > colorEnd.l) {
        result.l = result.l - 1
    } else if (colorNow.l < colorEnd.l) {
        result.l = result.l + 1
    }

    console.log(colorNow, colorEnd)

    return result
}

export class Dot implements IDot {
    x: number;
    y: number;
    size: number;
    gap: number;
    colorInactive: string;
    colorActive: string;
    colorFade: string = "";
    colorH: number = 0;
    colorS: number = 0;
    colorL: number = 0;
    active: boolean;
    hovered: boolean;
    fadeDelay: number;

    constructor(x: number, y: number, size: number, gap: number, colorInactive: string, colorActive: string, fadeDelay: number) {
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

    onMouseIn() {
        this.active = true;
        this.hovered = true;
    }

    onMouseOut() {
        this.active = false;
        this.hovered = true;
    }

    updateFadeColor() {
        const hslColorInactive = hexToHsl(this.colorInactive)


        if (this.colorFade) {

            if (this.colorH === hslColorInactive.h &&
                this.colorS === hslColorInactive.s &&
                this.colorL === hslColorInactive.l) {
                this.hovered = false
                return
            }


            const { h, s, l } = calculateNextHsl({ h: this.colorH, s: this.colorS, l: this.colorL }, hslColorInactive)
            this.colorH = h;
            this.colorS = s;
            this.colorL = l;

        } else {
            const hslColorActive = hexToHsl(this.colorActive)
            const { h, s, l } = calculateNextHsl(hslColorActive, hslColorInactive)
            this.colorH = h;
            this.colorS = s;
            this.colorL = l;
        }

        this.colorFade = 'HSL(' + this.colorH + ', ' + this.colorS + '%, ' + this.colorL + '%)'
    }
}


