<template>
  <div>
    <h3 v-if="getDisplayHistory">{{ getDisplayHistory }}</h3>
    <h2>{{ getDisplay === "" ? "0" : getDisplay }}</h2>
  </div>
</template>

<script>
 import { useCalcStore } from "../stores/CalculatorStore";
import { storeToRefs } from "pinia";

export default {
  name: "Display",
  setup() {
    const calc = useCalcStore();

    // extract specific store properties
    const { getDisplay, getDisplayHistory } = storeToRefs(calc);

    return {
      getDisplay,
    };
  },
};
</script>
