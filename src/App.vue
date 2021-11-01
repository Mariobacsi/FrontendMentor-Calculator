<script>
import ThemeSelector from "./components/ThemeSelector.vue";
import Display from "./components/Display.vue";
import Numpad from "./components/Numpad.vue";

export default {
  name: "app",
  components: {
    ThemeSelector,
    Display,
    Numpad,
  },
};
</script>

<template>
  <div class=" w-10/12 md:w-2/5 lg:w-1/3 mx-auto mt-8 grid gap-4">
    <div class="flex flex-row justify-between items-end">
      <p class="text-white align-text-bottom font-bold text-2xl lowercase">
        calc
      </p>
      <theme-selector></theme-selector>
    </div>
    <display class="bg-main-dark"></display>
    <numpad class="bg-main-base"></numpad>
  </div>
</template>

<style>
</style>