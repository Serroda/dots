<template>
    <div class="flex items-center gap-24px">
        <div class="input-container" :class="{ 'checkbox-animation': value }" v-if="mode === 'checkbox'"
            @click="value = !value">
        </div>
        <label>{{ text }}
            <input :type="mode" v-model="value" @change="emits('valueChanged',value)" class="hidden">
        </label>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    text: string,
    mode: 'checkbox' | 'radio' | 'number',
    defaultValue: boolean | number | string
}>()

const value = ref(props.defaultValue)
const emits = defineEmits<{
    (event: 'valueChanged', value : boolean | number | string) :void
}>()

</script>

<style scoped>
.input-container {
    width: 60px;
    height: 60px;
    border: 1px solid #333333;
    transition: border .2s;
    cursor: pointer;
    position: relative;
}

.input-container:hover {
    border: 1px solid #999999;
}

.input-container::after,
.input-container::before {
    content: " ";
    height: 1px;
    width: 48px;
    transition: background .2s;
    position: absolute;
    top: calc(50% - 2px / 2);
    left: calc(50% - 48px /2);
}

 .input-container::after {
    transform: rotate(135deg);
}

.input-container::before {
    transform: rotate(45deg);
} 

.checkbox-animation::after,
.checkbox-animation::before {
   background: #999999;
}
</style>

