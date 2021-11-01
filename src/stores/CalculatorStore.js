import { defineStore } from "pinia";

export const useCalcStore = defineStore("calc", {
  state: () => ({
    storage: 0,
    display: "",
    displayHistory: "",
  }),
  getters: {
    getDisplay: (state) => {
      return state.display;
    },
    getDisplayHistory: (state) => {
      state.displayHistory;
    },
  },
  actions: {
    clear() {
      this.display = "";
      this.storage = 0;
    },
    addValue(value) {
      this.display += value;
    },
    removeValue() {
      this.state.display.slice(0, -1);
    },
  },
});
