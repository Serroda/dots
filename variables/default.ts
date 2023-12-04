
export const useDefaultsVariables = () => {

    enum Names {
        DOT_SIZE = 'dot-size',
        GRID_GAP = 'grid-gap',
        DOT_COLOR_ACTIVE = 'color-active',
        DOT_COLOR_INACTIVE = 'color-inactive',
        BACKGROUND_COLOR = '--background',
        SECONDS_ON_ENTER = 'seconds-on-enter',
        SECONDS_ON_FADE = 'seconds-on-fade',
        PAINT_ON_HOVER = 'paint-on-hover'
    }

    interface IDefaultVariables {
        [Names.DOT_SIZE]: number,
        [Names.GRID_GAP]: number,
        [Names.DOT_COLOR_ACTIVE]: string,
        [Names.DOT_COLOR_INACTIVE]: string,
        [Names.BACKGROUND_COLOR]: string,
        [Names.SECONDS_ON_ENTER]: number,
        [Names.SECONDS_ON_FADE]: number,
        [Names.PAINT_ON_HOVER]: boolean,
    }

    const defaultVariables: IDefaultVariables = {
        'dot-size': 50,
        'grid-gap': 6,
        'color-active': "#999999",
        'color-inactive': "#333333",
        '--background':"#0D0D0D",
        'seconds-on-enter': 0,
        'seconds-on-fade': 10,
        'paint-on-hover': true
    }

    return {
        Names,
        defaultVariables
    }
}


