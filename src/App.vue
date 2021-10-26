<script>
import ThemeSelector from "./components/ThemeSelector.vue";
import Display from "./components/Display.vue";
import Numpad from "./components/Numpad.vue";

export default {
  name: "app",
  components: {
    ThemeSelector,
    Display,
    Numpad,
  },
};
</script>

<template>
  <div class="wrapper">
    <div>
      <h1>calc</h1>
      <theme-selector></theme-selector>
    </div>
    <display></display>
    <numpad></numpad>
  </div>
</template>
