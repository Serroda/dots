export const useGridControl = (dotSize: number) => {

    const columns = ref(0)
    const rows = ref(0)
    const dots = ref(0)

    const x = ref(-1)
    const y = ref(-1)

    const calculateIndex = computed(() => {
        if (x.value < 0 || y.value < 0) return -1;
        return x.value + (y.value * columns.value)
    })

    function resetCoord() {
        x.value = -1
        y.value = -1
    }

    function setCoord(eventTouch: TouchEvent) {
        x.value = Math.round(eventTouch.touches[0].clientX / window.innerWidth * columns.value)
        y.value = Math.round(eventTouch.touches[0].clientY / window.innerHeight * rows.value)
    }

    onMounted(() => {
        columns.value = Math.floor(window.innerWidth / dotSize)
        rows.value = Math.floor(window.innerHeight / dotSize)
        dots.value = Math.floor(rows.value * columns.value)
    })

    return {
        dots,
        calculateIndex,
        resetCoord,
        setCoord
    }

}