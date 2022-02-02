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
    },
    removeValue() {
      this.display = this.display.slice(0, -1);
    },
    addValue(value) {
      const lastChar = this.display.slice(-1)
      if(this.display == "" && value == 0) return
      if(isNaN(value) && isNaN(lastChar)) this.removeValue()
      this.display += value;
    },
  },
});
