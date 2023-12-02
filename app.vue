<template>
  <div class="h-100% w-100% relative">
    <div
      class="flex flex-wrap justify-center"
      @touchstart="setTouches"
      @touchmove.prevent="setTouches"
      @touchend="resetTouches"
    >
      <Dot
        v-for="(_, index) in dots"
        :key="index"
        :active="idsActive.includes(index)"
      />
    </div>

    <div class="flex justify-center button-position">
      <Box
        :corners="2"
        animation
        class="cursor-pointer"
        @click="openMenu = !openMenu"
      >
        <template #content>
          <div class="ml-40px mr-40px mt-20px mb-20px">
            <label>MENU</label>
          </div>
        </template>
      </Box>
    </div>

    <modal :open="openMenu">
      <template #content>
        <div class="p-40px">
          <h2 class="mt-0">OPTIONS</h2>
          <div class="mt-26px">
            <h3>GENERAL</h3>
            <CustomInput
              text="Paint on hover"
              mode="checkbox"
              :default-value="variableControl.variables.paintOnHover"
              @value-changed="(value) => valueChanged('paintOnHover', value)"
            ></CustomInput>
          </div>
        </div>
      </template>
    </modal>
  </div>
</template>

<script lang="ts" setup>
const variableControl = useVariableControl();
const { dots, touches, setTouches, resetTouches } = useGridControl();

const idsActive = computed(() => touches.value.map((item) => item.index));
const openMenu = ref(false);

function valueChanged(name: keyof typeof variableControl.variables, value: boolean | string | number) {

  /* variableControl.variables[name] = value as any;  */

}
</script>
