
interface TouchGrid {
    id: number,
    index: number,
}

export const useGridControl = () => {

    const { values, Names } = useVariableControl();

    let sizeDotPlusGap = 0
    let columns = 0
    let rows = 0

    const dots: Ref<IDot[]> = ref([])
    const touches: Ref<TouchGrid[]> = ref([])

    const calculateCoordX = (clientX: number) => Math.floor(clientX / sizeDotPlusGap)
    const calculateCoordY = (clientY: number) => Math.floor(clientY / sizeDotPlusGap)
    const getIndexItem = (x: number, y: number) => (x < 0 || y < 0) ? -1 : x + (y * columns)

    function setTouches(eventTouch: TouchEvent) {
        if (!values[Names.PAINT_ON_HOVER]) {
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

    const calculateItemSize = () => (values[Names.DOT_SIZE] + values[Names.GRID_GAP] * 2)
    const calculateColumns = () => Math.floor(window.innerWidth / sizeDotPlusGap)
    const calculateRows = () => Math.floor(window.innerHeight / sizeDotPlusGap)

    function setCanvasDimensions(canvas: HTMLCanvasElement) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createDots() {
        dots.value = []
        for (let row = 1; row <= rows; row++) {
            const y = row * sizeDotPlusGap - values[Names.DOT_SIZE] / 2

            for (let column = 1; column <= columns; column++) {
                const x = column * sizeDotPlusGap - values[Names.DOT_SIZE] / 2
                const dot = new Dot(x, y, values[Names.DOT_SIZE], values[Names.GRID_GAP], values[Names.DOT_COLOR_INACTIVE])
                dots.value.push(dot)
            }
        }
    }

    function setDotsInCanvas(canvas: HTMLCanvasElement) {
        const ctx = canvas.getContext('2d')

        if (ctx === null) {
            console.error('CTX no defined')
            return
        }

        for (const dot of dots.value) {
            ctx.fillStyle = dot.color;
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, dot.size / 2, 0, 2 * Math.PI);
            ctx.fill();
        }

    }

    function initCanvas(canvas: HTMLCanvasElement) {
        sizeDotPlusGap = calculateItemSize()
        columns = calculateColumns()
        rows = calculateRows()

        setCanvasDimensions(canvas)
        createDots()
        setDotsInCanvas(canvas)
    }


    return {
        dots,
        touches,
        resetTouches,
        setTouches, 
        initCanvas
    }

}