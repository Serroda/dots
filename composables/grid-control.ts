
interface TouchGrid {
    id: number,
    index: number,
}

export const useGridControl = () => {

    const variableControl = useVariableControl();

    const columns = ref(0)
    const rows = ref(0)
    const dots = ref(0)
    const touches: Ref<TouchGrid[]> = ref([])

    const calculateCoordX = (clientX: number) => Math.floor(clientX / window.innerWidth * columns.value)
    const calculateCoordY = (clientY: number) => Math.floor(clientY / window.innerHeight * rows.value)
    const getIndexItem = (x: number, y: number) => (x < 0 || y < 0) ? -1 : x + (y * columns.value)

    function setTouches(eventTouch: TouchEvent) {
        for (const touch of eventTouch.changedTouches) {


            const x = calculateCoordX(touch.clientX)
            const y = calculateCoordY(touch.clientY)

            const indexItem = getIndexItem(x, y)
            const touchSaved = touches.value.find(item => item.id == touch.identifier);

            if (touchSaved) {
                touchSaved.index = indexItem
            } else {
                touches.value = [...touches.value, { id: touch.identifier, index: indexItem }]
            }
        }
    }

    function resetTouches() {
        touches.value = []
    }

    const calculateColumns = () => Math.floor(window.innerWidth / (variableControl.dotSize + variableControl.gridGap * 2))
    const calculateRows = () => Math.floor(window.innerHeight / (variableControl.dotSize + variableControl.gridGap * 2))
    const calculateDotsNumber = () => Math.floor(rows.value * columns.value)

    function calculateGrid() {
        columns.value = calculateColumns()
        rows.value = calculateRows()
        dots.value = calculateDotsNumber()
    }

    onMounted(() => {
        calculateGrid();
        window.onresize = calculateGrid;
    })

    return {
        dots,
        touches,
        resetTouches,
        setTouches
    }

}