
enum DataType {
    Number,
    String,
    Boolean
}

const { defaultVariables, VariablesNames } = useDefaultsVariables();
const { setGlobalStyle } = useStyleControl()

function getFromLocalStorageOrDefault<T>(
    name: keyof typeof defaultVariables,
    type: DataType
): T {
    const variable = localStorage?.getItem(name);

    switch (type) {
        case DataType.Number:
            return (!variable ? defaultVariables[name] : parseInt(variable)) as T;
        case DataType.String:
            return (!variable ? defaultVariables[name] : variable) as T;
        case DataType.Boolean:
            return (!variable ? defaultVariables[name] : variable === 'true') as T;
        default:
            return null as T;
    }
}

const updateVariableLocalStorage = (name: string, value: number | string | boolean) => localStorage.setItem(name, value.toString());
const sendEventVariablesUpdated = () => document.dispatchEvent(new CustomEvent("variablesUpdated"));

export const useVariableControl = defineStore("variables", () => {

    const dotSize: Ref<number> = ref(
        getFromLocalStorageOrDefault(VariablesNames.DOT_SIZE,
            DataType.Number)
    );
    const gridGap: Ref<number> = ref(
        getFromLocalStorageOrDefault(VariablesNames.GRID_GAP,
            DataType.Number)
    );
    const dotColorActive: Ref<string> = ref(
        getFromLocalStorageOrDefault(
            VariablesNames.DOT_COLOR_ACTIVE,
            DataType.String
        )
    );
    const dotColorInactive: Ref<string> = ref(
        getFromLocalStorageOrDefault(
            VariablesNames.DOT_COLOR_INACTIVE,
            DataType.String
        )
    );
    const backgroundColor: Ref<string> = ref(
        getFromLocalStorageOrDefault(
            VariablesNames.BACKGROUND_COLOR,
            DataType.String
        )
    );

    const secondsOnEnter: Ref<number> = ref(
        getFromLocalStorageOrDefault(
            VariablesNames.SECONDS_ON_ENTER,
            DataType.Number
        )
    );

    const secondsOnFade: Ref<number> = ref(
        getFromLocalStorageOrDefault(
            VariablesNames.SECONDS_ON_FADE,
            DataType.Number
        )
    );

    const resetDefaults = () => {
        localStorage.clear();
        dotSize.value = getFromLocalStorageOrDefault(
            VariablesNames.DOT_SIZE,
            DataType.Number
        );
        gridGap.value = getFromLocalStorageOrDefault(
            VariablesNames.GRID_GAP,
            DataType.Number
        );
        dotColorActive.value = getFromLocalStorageOrDefault(
            VariablesNames.DOT_COLOR_ACTIVE,
            DataType.String
        );
        dotColorInactive.value = getFromLocalStorageOrDefault(
            VariablesNames.DOT_COLOR_INACTIVE,
            DataType.String
        );
        backgroundColor.value = getFromLocalStorageOrDefault(
            VariablesNames.BACKGROUND_COLOR,
            DataType.String
        );
        secondsOnEnter.value = getFromLocalStorageOrDefault(
            VariablesNames.SECONDS_ON_ENTER,
            DataType.Number
        );
        secondsOnFade.value = getFromLocalStorageOrDefault(
            VariablesNames.SECONDS_ON_FADE,
            DataType.Number
        );
    };

    return {
        dotSize,
        gridGap,
        dotColorActive,
        dotColorInactive,
        backgroundColor,
        secondsOnEnter,
        secondsOnFade,
        resetDefaults,
    };
});
