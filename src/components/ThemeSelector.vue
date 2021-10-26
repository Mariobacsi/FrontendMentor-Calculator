<template>
  <h2>Theme</h2>
  <div>
    <button @click="theme = 1">1</button>
    <button @click="theme = 2">2</button>
    <button @click="theme = 3">3</button>
    <input type="range" :value="theme" min="1" max="3" step="1">
  </div>
</template>

<script>
export default {
  name: "ThemeSelector",
  data(){
    return{
      theme: 1
    }
  }
};
</script>

<style></style>
