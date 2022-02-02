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
      if(this.display == "" && (value == 0 || value == '.')) return
      if(isNaN(value) && isNaN(this.display.slice(-1))) this.removeValue()
      this.display += value;
    },
    evaluate() {
      if(isNaN(this.display.charAt(0))) this.display = this.storage + this.display
      if(isNaN(this.display.slice(-1))) this.removeValue()
      const e = eval(this.display)
      this.storage = e
      this.clear()
    }
  },
});
