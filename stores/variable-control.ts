enum DataType {
    Number
}

const { defaultVariables, VariablesNames } = useDefaultsVariables();

function getFromLocalStorageOrDefault(name: keyof typeof defaultVariables, type: DataType) {

    const variable = localStorage?.getItem(name);

    if (variable === null) {
        return defaultVariables[name]
    }

    switch (type) {
        case DataType.Number:
            return parseInt(variable);
    }
}

function updateVariableLocalStorage(name: string, value: number) {
    localStorage.setItem(name, value.toString())
}

function sendEventVariablesUpdated(){
    document.dispatchEvent(new CustomEvent("variablesUpdated"))
}

export const useVariableControl = defineStore('variables', () => {

    const dotSize: Ref<number> = ref(getFromLocalStorageOrDefault(VariablesNames.DOT_SIZE, DataType.Number))
    const gridGap: Ref<number> = ref(getFromLocalStorageOrDefault(VariablesNames.GRID_GAP, DataType.Number))

    const resetDefaults = () => {
        localStorage.clear();
        dotSize.value = getFromLocalStorageOrDefault(VariablesNames.DOT_SIZE, DataType.Number)
        gridGap.value = getFromLocalStorageOrDefault(VariablesNames.GRID_GAP, DataType.Number)
    }

    watch(dotSize, () => {
        updateVariableLocalStorage(VariablesNames.DOT_SIZE, dotSize.value)
        sendEventVariablesUpdated()
    }, { immediate: true })

    watch(gridGap, () => {
        updateVariableLocalStorage(VariablesNames.GRID_GAP, gridGap.value)
        sendEventVariablesUpdated()
    }, { immediate: true })

    return {
        dotSize,
        gridGap,
        resetDefaults
    }

})