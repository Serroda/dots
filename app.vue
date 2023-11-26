<template>
  <div class="h-100% w-100%">
    <div class="flex flex-wrap">
      <Dot v-for="_ in dots"/>
    </div>
   
  </div>
</template>

<script lang="ts" setup>
const dots = ref(0)

onMounted(()=>{
 
  let widthCount = Math.floor(window.innerWidth / 32)
  let heightCount = Math.floor(window.innerHeight / 32)

  dots.value = Math.floor(heightCount * widthCount);

})


</script>