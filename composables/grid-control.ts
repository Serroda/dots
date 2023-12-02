
interface TouchGrid {
    id: number,
    index: number,
}

export const useGridControl = () => {

    const {values,Names} = useVariableControl();

    let columns = 0
    let rows = 0
    const dots = ref(0)
    const touches: Ref<TouchGrid[]> = ref([])
    const sizeDotPlusGap = (values[Names.DOT_SIZE] 
        + values[Names.GRID_GAP] * 2)

    const calculateCoordX = (clientX: number) => Math.floor(clientX / sizeDotPlusGap)
    const calculateCoordY = (clientY: number) => Math.floor(clientY / sizeDotPlusGap)
    const getIndexItem = (x: number, y: number) => (x < 0 || y < 0) ? -1 : x + (y * columns)

    function setTouches(eventTouch: TouchEvent) {
        if(!values[Names.PAINT_ON_HOVER]) {
            return
        }

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

    const calculateColumns = () => Math.floor(window.innerWidth / sizeDotPlusGap)
    const calculateRows = () => Math.floor(window.innerHeight / sizeDotPlusGap)
    const calculateDotsNumber = () => Math.floor(rows * columns)

    function calculateGrid() {
        columns = calculateColumns()
        rows = calculateRows()
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