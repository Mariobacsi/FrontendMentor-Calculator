<template>
  <div class="grid grid-cols-4 gap-3 p-5 rounded-md">
    <button
      v-for="button in buttons"
      :key="button.value || button"
      :value="button.value || button"
      class="bg-white border-b-2 text-2xl font-bold border-calcbutton-shade rounded"
      :class="button.css"
      @click="this.click(button.value || button)"
    >
      {{ button.value || button }}
    </button>
  </div>
</template>
<script>
import { useCalcStore } from "../../stores/CalculatorStore";

export default {
  name: "Numpad",
  setup() {
    const calc = useCalcStore();
    const buttons = [
      7,
      8,
      9,
      {
        value: "DEL",
        css: "text-sm text-white border-gray-800 bg-gray-500",
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
        css: "text-sm col-span-2 text-white border-gray-800 bg-gray-500",
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
