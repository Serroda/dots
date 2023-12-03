const { defaultVariables, Names } = useDefaultsVariables();

export const useStyleControl = () => {

    const namesStyle = [Names.BACKGROUND_COLOR, Names.DOT_COLOR_ACTIVE, Names.DOT_COLOR_INACTIVE,
    Names.DOT_SIZE, Names.GRID_GAP, Names.SECONDS_ON_ENTER, Names.SECONDS_ON_FADE]

    function setGlobalStyle(variable: keyof typeof defaultVariables, value: string) {


        if (!namesStyle.includes(variable)) {
            return
        }

        const root = document.querySelector(':root') as HTMLStyleElement;
        if (!root) throw new Error("Root element no detected");

        switch (variable) {
            case Names.SECONDS_ON_ENTER:
            case Names.SECONDS_ON_FADE:
                root.style.setProperty(variable, value + 's');
                break;
            case Names.GRID_GAP:
            case Names.DOT_SIZE:
                root.style.setProperty(variable, value + 'px');
                break;
            default:
                root.style.setProperty(variable, value);
                break;
        }
    }

    function removeStyles(){

        const root = document.querySelector(':root') as HTMLStyleElement;
        if (!root) throw new Error("Root element no detected");

        root.style.cssText= ''
    }

    return {
        setGlobalStyle,
        removeStyles
    }

}