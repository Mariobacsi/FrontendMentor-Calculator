<template>
  <button
    class="bg-white border-b-2 text-xl lg:text-2xl font-bold border-calcbutton-shade rounded"
  >
    {{ value }}
  </button>
</template>

<script>
export default {
  name: "NumpadButton",
  props: {
    value: [String, Number],
  },
};
</script>

<style></style>
