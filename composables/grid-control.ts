export const useGridControl = () => {

    const { values, Names } = useVariableControl();
    const customCanvas: Ref<ICanvas | null> = ref(null)

    const calculateItemSize = () => (values[Names.DOT_SIZE] + values[Names.GRID_GAP] * 2)

    function setTouches(event: TouchEvent | MouseEvent) {
        if (!values[Names.PAINT_ON_HOVER]) {
            return
        }

        if (event instanceof MouseEvent) {
            customCanvas.value?.searchAndPaint(event.clientX, event.clientY)
        } else {
            for (const touch of event.changedTouches) {
                customCanvas.value?.searchAndPaint(touch.clientX, touch.clientY)
            }
        }
    }

    function resetTouches() {
        customCanvas.value?.clearSurface();
        createDots()
    }

    function createDots() {

        if (customCanvas.value === null) return;

        customCanvas.value.dots = []
        for (let row = 1; row <= customCanvas.value.rows; row++) {
            const y = row * customCanvas.value.itemSize - values[Names.DOT_SIZE] / 2

            for (let column = 1; column <= customCanvas.value.columns; column++) {
                const x = column * customCanvas.value.itemSize - values[Names.DOT_SIZE] / 2

                const dot = new Dot(x, y,
                    values[Names.DOT_SIZE],
                    values[Names.GRID_GAP],
                    values[Names.DOT_COLOR_INACTIVE],
                    values[Names.DOT_COLOR_ACTIVE],
                    values[Names.SECONDS_ON_FADE])

                customCanvas.value.addDot(dot)
            }
        }
    }

    return {
        customCanvas,
        createDots,
        setTouches,
        resetTouches,
        calculateItemSize
    }

}