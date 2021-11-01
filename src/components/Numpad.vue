<template>
  <div class="grid grid-cols-4 gap-3 p-5 rounded-md">
    <!-- 7 8 9 DEL -->
    <numpad-button value="7"></numpad-button>
    <numpad-button value="8"></numpad-button>
    <numpad-button value="9"></numpad-button>
    <numpad-button
      class="text-white border-gray-800 bg-gray-500"
      value="DEL"
      :funct="removeValue"
    ></numpad-button>
    <!-- 4 5 6 + -->
    <numpad-button value="4"></numpad-button>
    <numpad-button value="5"></numpad-button>
    <numpad-button value="6"></numpad-button>
    <numpad-button value="+"></numpad-button>
    <!-- 1 2 3 - -->
    <numpad-button value="1"></numpad-button>
    <numpad-button value="2"></numpad-button>
    <numpad-button value="3"></numpad-button>
    <numpad-button value="-"></numpad-button>
    <!-- . 0 / x -->
    <numpad-button value="."></numpad-button>
    <numpad-button value="0"></numpad-button>
    <numpad-button value="/"></numpad-button>
    <numpad-button value="x"></numpad-button>
    <!-- RESET = -->
    <numpad-button
      class="col-span-2 text-white border-gray-800 bg-gray-500"
      value="RESET"
      :funct="clear"
    ></numpad-button>
    <numpad-button
      class="col-span-2 text-white bg-red-600 border-red-800"
      value="="
    ></numpad-button>
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

    return {
      removeValue: calc.removeValue,
      clear: calc.clear,
    };
  },
};
</script>
