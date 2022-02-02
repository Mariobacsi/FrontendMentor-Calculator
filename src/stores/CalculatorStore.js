import { defineStore } from "pinia";

export const useCalcStore = defineStore("calc", {
  state: () => ({
    storage: 0,
    storageTemp: "",
    display: "",
    displayHistory: "",
    flagZero: false,
    flagComma: false,
    flagOperator: false,
  }),
  getters: {
    getDisplay: (state) => {
      if (state.display) return state.display + state.storageTemp;
      else return state.storageTemp;
    },
    getDisplayHistory: (state) => {
      return state.displayHistory;
    },
  },
  actions: {
    clear() {
      this.display = "";
      this.displayHistory = "";
      this.storage = 0;
    },
    removeValue() {
      if (this.storageTemp === "") this.display = this.display.slice(0, -1);
      else this.storageTemp = this.storageTemp.slice(0, -1);
    },
    addValue(value) {
      // if(this.display == "" && (value == 0 || value == '.')) return
      // if (value == 0) {
      //   if (!this.flagZero) this.flagZero = true;
      //   else return;
      // } else this.flagZero = false;
      this.storageTemp += value;
    },
    addOperator(value) {
      if (this.flagOperator) this.removeValue();
      else {
        this.display += this.storageTemp;
        this.flagOperator = true;
      }
      this.display += value;
    },
    evaluate() {
      // if(isNaN(this.display.charAt(0))) this.display = this.storage + this.display
      if (isNaN(this.display.slice(-1))) this.removeValue();
      const e = eval(this.display);
      this.storage = e;
      this.displayHistory = this.display;
      this.display = "";
    },
  },
});
