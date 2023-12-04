const { defaultVariables, Names } = useDefaultsVariables();

export const useStyleControl = () => {

    const namesStyle = [Names.BACKGROUND_COLOR]

    function setGlobalStyle(variable: keyof typeof defaultVariables, value: string) {
        
        if (!namesStyle.includes(variable)) {
            return
        }

        const root = document.querySelector(':root') as HTMLStyleElement;
        if (!root) throw new Error("Root element no detected");

        root.style.setProperty(variable, value);
    }

    function removeStyles(){

        const root = document.querySelector(':root') as HTMLStyleElement;
        if (!root) throw new Error("Root element no detected");

        root.style.cssText = ''
    }

    return {
        setGlobalStyle,
        removeStyles
    }

}