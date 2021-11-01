<template>
  <div class="grid grid-cols-3">
    <div class="col-span-2"></div>

    <div class="flex px-1">
      <button
        class="text-white text-sm font-semibold flex-1"
        v-for="n in nThemes"
        :key="n"
        @click="theme = n"
      >
        {{ n }}
      </button>
    </div>
    <h2
      class="text-white uppercase mr-4 text-sm font-semibold col-auto text-right col-span-2"
    >
      Theme
    </h2>
    <input type="range" :value="theme" min="1" max="3" step="1" />
  </div>
</template>

<script>
export default {
  name: "ThemeSelector",
  data() {
    return {
      theme: 1,
      nThemes: 3,
    };
  },
};
</script>

<style scoped>
</style>
