export const useGridControl = () => {

    const dotSize = ref(0)
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

    function init(){
        const relationAspect = window.innerWidth / window.innerHeight ;

        dotSize.value = Math.floor(window.innerWidth /  (25 * relationAspect))
        columns.value = Math.floor(window.innerWidth / dotSize.value)
        rows.value = Math.floor(window.innerHeight / dotSize.value)
        dots.value = Math.floor(rows.value * columns.value)
    }

    onMounted(() => {
        init();
        window.onresize = init;
    })

    return {
        dots,
        dotSize,
        calculateIndex,
        resetCoord,
        setCoord
    }

}