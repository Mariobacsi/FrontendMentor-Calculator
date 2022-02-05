<template>
  <div class="rounded-md text-white font-bold p-3">
    <h3 v-if="getDisplay">
      {{ getDisplayHistory }}
    </h3>
    <h2 class="text-right text-xl lg:text-2xl">
      {{ getDisplay ? getDisplay : getDisplayHistory ? getDisplayHistory : 0 }}
    </h2>
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
      getDisplayHistory,
    };
  },
};
</script>
