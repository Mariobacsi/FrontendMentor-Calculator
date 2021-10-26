<template>
  <div class="">
    <!-- 7 8 9 DEL -->
    <numpad-button value="7"></numpad-button>
    <numpad-button value="8"></numpad-button>
    <numpad-button value="9"></numpad-button>
    <numpad-button value="DEL" :funct="removeValue"></numpad-button>
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
    <numpad-button value="RESET" :funct="clear"></numpad-button>
    <numpad-button value="="></numpad-button>
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
