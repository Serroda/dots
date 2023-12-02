
export const useDefaultsVariables = () => {

    enum VariablesNames {
        DOT_SIZE = '--dot-size',
        GRID_GAP = '--grid-gap',
        DOT_COLOR_ACTIVE = '--color-4',
        DOT_COLOR_INACTIVE = '--color-8',
        BACKGROUND_COLOR = '--background',
        SECONDS_ON_ENTER = '--seconds-on-enter',
        SECONDS_ON_FADE = '--seconds-on-fade',
        PAINT_ON_HOVER = 'paint-on-hover'
    }

    interface DefaultValues {
        [VariablesNames.DOT_SIZE]: number,
        [VariablesNames.GRID_GAP]: number,
        [VariablesNames.DOT_COLOR_ACTIVE]: string,
        [VariablesNames.DOT_COLOR_INACTIVE]: string,
        [VariablesNames.BACKGROUND_COLOR]: string,
        [VariablesNames.SECONDS_ON_ENTER]: number,
        [VariablesNames.SECONDS_ON_FADE]: number,
        [VariablesNames.PAINT_ON_HOVER]: boolean,
    }

    const defaultVariables: DefaultValues = {
        '--dot-size': 50,
        '--grid-gap': 6,
        '--color-4': "#999999",
        '--color-8': "#333333",
        '--background':"#0D0D0D",
        '--seconds-on-enter': 0,
        '--seconds-on-fade': 10,
        'paint-on-hover': true
    }

    return {
        VariablesNames,
        defaultVariables
    }
}


