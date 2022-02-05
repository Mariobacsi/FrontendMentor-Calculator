<template>
  <div class="grid grid-cols-4 gap-3 p-5 rounded-md">
    <numpad-button
      v-for="button in buttons"
      :key="button.value || button"
      :value="button.value || button"
      :class="button.css"
      @click="this.click(button.value || button)"
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
      7,
      8,
      9,
      {
        value: "DEL",
        css: "text-white border-gray-800 bg-gray-500",
      },
      4,
      5,
      6,
      "+",
      1,
      2,
      3,
      "-",
      ".",
      0,
      "/",
      "*",
      {
        value: "RESET",
        css: "col-span-2 text-white border-gray-800 bg-gray-500",
      },
      {
        value: "=",
        css: "col-span-2 text-white bg-red-600 border-red-800",
      },
    ];

    let click = function (button) {
      button == "DEL"
        ? calc.removeValue()
        : "+-/x".includes(button)
        ? calc.addOperator(button)
        : button == "."
        ? calc.addComma()
        : button == "RESET"
        ? calc.clear()
        : button == "="
        ? calc.evaluate()
        : calc.addValue(button);
    };

    return {
      buttons,
      click,
    };
  },
};
</script>
