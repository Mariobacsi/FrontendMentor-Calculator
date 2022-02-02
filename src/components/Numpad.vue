<template>
  <div class="grid grid-cols-4 gap-3 p-5 rounded-md">
    <numpad-button v-for="button in buttons" :key="button"
    :value="button.value || button"
    :class="button.css"
    :trigger="button.function"
    />
  </div>
</template>
<script>
import { useCalcStore } from "../stores/CalculatorStore";

import NumpadButton from "./NumpadButton.vue";

export default {
  name: "Numpad",
  components: {
    NumpadButton,
  },
  setup() {
    const calc = useCalcStore();
    const buttons = [
      7,8,9,
      {
        value: "DEL",
        function: calc.removeValue,
        css: "text-white border-gray-800 bg-gray-500"
      },
      4,5,6,'+',
      1,2,3,'-',
      '.',0,'/','x',
      {
        value: "RESET",
        function: calc.clear,
        css: "col-span-2 text-white border-gray-800 bg-gray-500"
      },
      {
        value: "=",
        function: calc.evaluate,
        css: "col-span-2 text-white bg-red-600 border-red-800"
      }
    ]

    return {
      buttons
    };
  },
};
</script>
