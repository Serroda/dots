interface hslColor { h: number, s: number, l: number }

export interface IDot {
    x: number;
    y: number;
    size: number;
    gap: number;
    colorInactive: string;
    colorActive: string;
    colorFade: string;
    colorHslFade: hslColor;
    active: boolean;
    hovered: boolean;
    onMouseIn: Function;
    onMouseOut: Function;
    updateFadeColor: Function;
    interval: NodeJS.Timeout | null
}

const { hexToHsl } = useStyleControl();

function calculateNextHsl(colorNow: hslColor, colorEnd: hslColor) {
    
    const result = {
        h: colorNow.h,
        s: colorNow.s,
        l: colorNow.l
    }

    if (colorNow.h > colorEnd.h) {
        result.h = (result.h - 1)
    } else if (colorNow.h < colorEnd.h) {
        result.h = (result.h + 1)
    }

    if (colorNow.s > colorEnd.s) {
        result.s = (result.s - 1)
    } else if (colorNow.s < colorEnd.s) {
        result.s = (result.s + 1)
    }

     if (colorNow.l > colorEnd.l) {
        result.l = (result.l - .1)
    } else if (colorNow.l < colorEnd.l) {
        result.l = (result.l  + .1)
    } 

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
    colorHslFade : hslColor = {h: 0, s: 0, l: 0};
    active: boolean;
    hovered: boolean;
    interval: NodeJS.Timeout | null = null;

    constructor(x: number, y: number, size: number, gap: number, colorInactive: string, colorActive: string) {
        this.x = x
        this.y = y;
        this.size = size;
        this.gap = gap;
        this.colorInactive = colorInactive;
        this.colorActive = colorActive;
        this.active = false
        this.hovered = false
    }

    onMouseIn() {
        this.active = true;
        this.hovered = false;
    }

    onMouseOut() {
        this.active = false;
        this.hovered = true;
    }

    updateFadeColor() {
        const hslColorInactive = hexToHsl(this.colorInactive)
   
        if (this.colorFade) {

            if (this.colorHslFade.h === hslColorInactive.h &&
                this.colorHslFade.s === hslColorInactive.s &&
                this.colorHslFade.l.toFixed(2) == hslColorInactive.l.toFixed(2)) {

                this.hovered = false

                if (this.interval) {
                    clearInterval(this.interval)
                    this.interval = null
                }

                return
            }
        
            const hslColorNext = calculateNextHsl(this.colorHslFade, hslColorInactive)
            this.colorHslFade = hslColorNext
        } else {
            const hslColorActive = hexToHsl(this.colorActive)
            const hslColorNext = calculateNextHsl(hslColorActive, hslColorInactive)
           this.colorHslFade = hslColorNext
        }

        this.colorFade = 'HSL(' + this.colorHslFade.h + ', ' + this.colorHslFade.s + '%, ' + this.colorHslFade.l + '%)'
    }
}


