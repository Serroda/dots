const { defaultVariables, Names } = useDefaultsVariables();
const { setGlobalStyle } = useStyleControl()

function getFromLocalStorageOrDefault<T>(
    name: keyof typeof defaultVariables
): T {
    const variable = localStorage?.getItem(name);

    switch (typeof defaultVariables[name]) {
        case 'string':
            return (!variable ? defaultVariables[name] : variable) as T;
        case 'number':
            return (!variable ? defaultVariables[name] : parseInt(variable)) as T;
        case 'boolean':
            return (!variable ? defaultVariables[name] : variable === 'true') as T;
        default:
            return null as T;
    }
}

const updateVariableLocalStorage = <T extends keyof typeof defaultVariables>(name: T, value: typeof defaultVariables[T]) => localStorage.setItem(name, value.toString());

export const useVariableControl = defineStore("variables", () => {
    const values: typeof defaultVariables = reactive({
        [Names.DOT_SIZE]: getFromLocalStorageOrDefault(Names.DOT_SIZE),
        [Names.GRID_GAP]: getFromLocalStorageOrDefault(Names.GRID_GAP),
        [Names.DOT_COLOR_ACTIVE]: getFromLocalStorageOrDefault(
            Names.DOT_COLOR_ACTIVE
        ),
        [Names.DOT_COLOR_INACTIVE]: getFromLocalStorageOrDefault(
            Names.DOT_COLOR_INACTIVE
        ),
        [Names.BACKGROUND_COLOR]: getFromLocalStorageOrDefault(
            Names.BACKGROUND_COLOR
        ),
        [Names.SECONDS_ON_ENTER]: getFromLocalStorageOrDefault(
            Names.SECONDS_ON_ENTER
        ),
        [Names.SECONDS_ON_FADE]: getFromLocalStorageOrDefault(
            Names.SECONDS_ON_FADE
        ),
        [Names.PAINT_ON_HOVER]: getFromLocalStorageOrDefault(
            Names.PAINT_ON_HOVER
        ),
    })

    const resetDefaults = () => {
        localStorage.clear();

        let key: keyof typeof values;
        for (key in values) {
            values[key] = getFromLocalStorageOrDefault(key)
        }
    };

    function changeValue<T extends keyof typeof values>(name: T, value: typeof values[T]) {
        values[name] = value;
        updateVariableLocalStorage(name, value)
        setGlobalStyle(name, value.toString())
    }

    let key: keyof typeof values;
    for (key in values) {
        setGlobalStyle(key, values[key].toString())
    }


    return {
        values,
        resetDefaults,
        changeValue,
        Names
    };
});
