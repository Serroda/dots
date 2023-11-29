const { defaultVariables } = useDefaultsVariables();

export const useStyleControl = () => {

    function setGlobalStyle(variable: keyof typeof defaultVariables, value: string) {

        const root = document.querySelector(':root') as HTMLStyleElement;
        if (!root) throw new Error("Root element no detected");

        root.style.setProperty(variable, value);
    }

    return {
        setGlobalStyle
    }

}