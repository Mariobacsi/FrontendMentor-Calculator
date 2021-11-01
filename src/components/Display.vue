<template>
  <div class="rounded-md text-white font-bold p-3">
    <h3 v-if="getDisplayHistory">{{ getDisplayHistory }}</h3>
    <h2 class="text-right text-xl lg:text-2xl">
      {{
        !getDisplay || getDisplay === undefined || getDisplay === ""
          ? "0"
          : getDisplay
      }}
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
    };
  },
};
</script>
