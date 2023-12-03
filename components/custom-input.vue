<template>
    <div class="flex items-center gap-24px mb-20px">
        <div v-if="mode === 'checkbox'" class="input-container checkbox" :class="{ 'checkbox-animation': value }"
            @click="changeGlobalValue(!values[nameValue])">
        </div>
        <div v-if="mode === 'number'" class="input-container" :class="{ 'checkbox-animation': value }">
            <input type="number" class="custom-input-number" :value="value"
                @input="changeGlobalValue(($event.target as HTMLInputElement).value)">
        </div>
        <label>{{ text }}
            <input v-if="mode === 'checkbox'" :type="mode" @input="changeGlobalValue(!values[nameValue])" class="hidden">
        </label>
    </div>
</template>

<script lang="ts" setup>
const { values, changeValue } = useVariableControl();

const props = defineProps<{
    text: string,
    mode: 'checkbox' | 'radio' | 'number',
    nameValue: keyof typeof values
}>()

const value = computed(() => values[props.nameValue])

function changeGlobalValue(newValue: number | string | boolean) {

    switch (props.mode) {
        case 'number':
            console.log(values[props.nameValue])
            if (newValue != '') { changeValue(props.nameValue, newValue) }
            else { changeValue(props.nameValue, values[props.nameValue]) }
            break;

        default:
            changeValue(props.nameValue, newValue)
            break;
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
    -moz-appearance: textfield;
}
</style>

