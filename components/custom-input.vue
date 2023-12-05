<template>
    <div class="flex items-center gap-24px">
        <div v-if="mode === 'checkbox'" class="input-container checkbox" :class="{ 'checkbox-animation': value }"
            @click="value = !value">
        </div>
        <div v-if="mode === 'number'" class="input-container">
            <input type="number" class="custom-input-number" v-model="value" @keydown="(event) => onlyNumbers(event)">
        </div>

        <div v-if="mode === 'color'" class="input-container">
            <input type="color" class="custom-input-color" v-model="value" >
        </div>

        <label>{{ text }}
            <input v-if="mode === 'checkbox'" :type="mode" v-model="value" class="hidden">
        </label>
    </div>
</template>

<script lang="ts" setup>
const { values, changeValue } = useVariableControl();

const props = defineProps<{
    text: string,
    mode: 'checkbox' | 'radio' | 'number' | 'color',
    nameValue: keyof typeof values
}>()

const value = computed({
    get: () => values[props.nameValue],
    set: (val) =>{
        if(val === '' && props.mode === 'number') {
            changeValue(props.nameValue, 1)
        } else {
            changeValue(props.nameValue, val)
        }
    } 
})

function onlyNumbers(event: KeyboardEvent) {
    const regExp = /[0-9]|Backspace|ArrowLeft|ArrowRight/
    const newValue = event.key;
 
    if (!regExp.test(newValue)) {
        event.preventDefault()
    }
}

</script>

<style scoped>
.input-container {
    width: 60px;
    height: 60px;
    border: 1px solid #333333;
    transition: border .2s;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

.input-container:hover {
    border: 1px solid #999999;
}

.input-container.checkbox::after,
.input-container.checkbox::before {
    content: " ";
    height: 1px;
    width: 48px;
    transition: background .2s;
    position: absolute;
    top: calc(50% - 2px / 2);
    left: calc(50% - 48px /2);
}

.input-container.checkbox::after {
    transform: rotate(135deg);
}

.input-container.checkbox::before {
    transform: rotate(45deg);
}

.checkbox-animation.checkbox::after,
.checkbox-animation.checkbox::before {
    background: #999999;
}

.custom-input-number {
    width: 100%;
    text-align: center;
    background: transparent;
    font-family: ChakraPetch;
    color: var(--color-3);
    border: none;
}


.custom-input-number::-webkit-outer-spin-button,
.custom-input-number::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.custom-input-number[type=number] {
    appearance: textfield;
}
.custom-input-color {
    width: 80%;
    height: 80%;
    background: transparent;
    border: none;
    cursor: pointer;
}
</style>

