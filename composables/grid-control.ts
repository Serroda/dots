
interface TouchGrid {
    id: number,
    index: number,
}

export const useGridControl = () => {

    const dotSize = ref(0)
    const columns = ref(0)
    const rows = ref(0)
    const dots = ref(0)
    const touches: Ref<TouchGrid[]> = ref([])

    const calculateCoordX = (clientX: number) => Math.round(clientX / window.innerWidth * columns.value)
    const calculateCoordY = (clientY: number) => Math.round(clientY / window.innerHeight * rows.value)
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

    const calculateDotSize = (relationAspect: number, numberOfDotsInColumns: number) => Math.floor(window.innerWidth / (numberOfDotsInColumns * relationAspect))
    const calculateColumns = () => Math.floor(window.innerWidth / dotSize.value)
    const calculateRows = () => Math.floor(window.innerHeight / dotSize.value)
    const calculateDotsNumber = () => Math.floor(rows.value * columns.value)

    function init() {

        const relationAspect = window.innerWidth / window.innerHeight;

        dotSize.value = calculateDotSize(relationAspect, 25)
        columns.value = calculateColumns()
        rows.value = calculateRows()
        dots.value = calculateDotsNumber()
    }

    onMounted(() => {
        init();
        window.onresize = init;
    })

    return {
        dots,
        touches,
        dotSize,
        resetTouches,
        setTouches
    }

}