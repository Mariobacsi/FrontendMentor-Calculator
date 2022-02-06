import {defineStore} from "../../_snowpack/pkg/pinia.js";
export const useCalcStore = defineStore("calc", {
  state: () => ({
    storage: void 0,
    calcTemp: "",
    calc: "",
    calcHistory: "",
    flagComma: false,
    flagOperator: false
  }),
  getters: {
    getDisplay: (state) => {
      if (state.calc)
        return state.calc + state.calcTemp;
      if (state.calcTemp)
        return state.calcTemp;
      return "";
    },
    getDisplayHistory: (state) => {
      if (state.calcHistory)
        return state.calcHistory + "=" + state.storage;
      return "";
    }
  },
  actions: {
    clear() {
      this.calc = "";
      this.calcTemp = "";
      this.calcHistory = "";
      this.storage = void 0;
      this.flagOperator = false;
      this.flagComma = false;
    },
    removeValue() {
      if (this.calcTemp === "")
        this.calc = this.calc.slice(0, -1);
      else
        this.calcTemp = this.calcTemp.slice(0, -1);
    },
    addValue(value) {
      this.calcTemp += value;
      this.flagOperator = false;
    },
    addComma() {
      this.removeLeadingZeros();
      if (!this.flagComma) {
        this.calcTemp += ".";
        this.flagComma = this.flagOperator = true;
      }
    },
    addOperator(value) {
      if (this.flagOperator)
        this.removeValue();
      else {
        this.removeLeadingZeros();
        this.flagOperator = true;
      }
      this.calc += value;
      this.flagComma = false;
    },
    evaluate() {
      this.removeLeadingZeros();
      console.log("lastchar", this.calc.charAt(this.calc.length - 1));
      if ("+-./*".includes(this.calc.charAt(this.calc.length - 1)))
        this.removeValue();
      this.flagOperator = false;
      this.flagComma = false;
      if (this.storage && "+-/*".includes(this.calc.charAt(0)))
        this.calc = this.storage + this.calc;
      this.storage = eval(this.calc);
      this.calcHistory = this.calc;
      this.calc = "";
    },
    removeLeadingZeros() {
      if (this.calcTemp != "")
        this.calc += this.calcTemp.replace(/^0+/, "");
      this.calcTemp = "";
    }
  }
});
