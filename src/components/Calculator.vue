<template>
  <div class="w-64 md:w-80 mx-auto grid gap-4">
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

<script>
import ThemeSelector from "./calculator/ThemeSelector.vue";
import Display from "./calculator/Display.vue";
import Numpad from "./calculator/Numpad.vue";

export default {
  name: "calculator",
  components: {
    ThemeSelector,
    Display,
    Numpad,
  },
};
</script>

<style></style>
