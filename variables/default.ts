
export const useDefaultsVariables = () => {

    interface DefaultValues {
        [VariablesNames.DOT_SIZE]: number,
        [VariablesNames.GRID_GAP]: number
    }

    enum VariablesNames {
        DOT_SIZE = 'DOT_SIZE',
        GRID_GAP = 'GRID_GAP'
    }

    const defaultVariables: DefaultValues = {
        DOT_SIZE: 45,
        GRID_GAP: 6
    }

    return {
        VariablesNames,
        defaultVariables
    }
}


