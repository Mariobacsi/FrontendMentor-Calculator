<template>
  <button
    class="bg-white border-b-2 text-xl lg:text-2xl font-bold border-calcbutton-shade rounded"
    @click="trigger(value)"
  >
    {{ value }}
  </button>
</template>

<script>
import { useCalcStore } from "../stores/CalculatorStore";

export default {
  name: "NumpadButton",
  setup() {
    const calc = useCalcStore();

    return {
      addValue: calc.addValue,
    };
  },
  props: {
    value: [String, Number],
    funct: {
      type: Function,
      default(value) {
        this.addValue(value);
      },
    },
  },
  methods: {
    trigger(value) {
      this.funct(value);
    },
  },
};
</script>

<style></style>
