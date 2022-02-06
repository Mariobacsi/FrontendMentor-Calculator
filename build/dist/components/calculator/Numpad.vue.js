
import { useCalcStore } from "../../stores/CalculatorStore.js";

const defaultExport = {
  name: "Numpad",
  setup() {
    const calc = useCalcStore();
    const buttons = [
      7,
      8,
      9,
      {
        value: "DEL",
        css: "text-sm text-white border-gray-800 bg-gray-500",
      },
      4,
      5,
      6,
      "+",
      1,
      2,
      3,
      "-",
      ".",
      0,
      "/",
      "*",
      {
        value: "RESET",
        css: "text-sm col-span-2 text-white border-gray-800 bg-gray-500",
      },
      {
        value: "=",
        css: "col-span-2 text-white bg-red-600 border-red-800",
      },
    ];

    let click = function (button) {
      button == "DEL"
        ? calc.removeValue()
        : "+-/x".includes(button)
        ? calc.addOperator(button)
        : button == "."
        ? calc.addComma()
        : button == "RESET"
        ? calc.clear()
        : button == "="
        ? calc.evaluate()
        : calc.addValue(button);
    };

    return {
      buttons,
      click,
    };
  },
};

import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, toDisplayString as _toDisplayString, normalizeClass as _normalizeClass } from "../../../_snowpack/pkg/vue.js"

const _hoisted_1 = { class: "grid grid-cols-4 gap-3 p-5 rounded-md" }
const _hoisted_2 = ["value", "onClick"]

export function render(_ctx, _cache) {
  return (_openBlock(), _createElementBlock("div", _hoisted_1, [
    (_openBlock(true), _createElementBlock(_Fragment, null, _renderList(_ctx.buttons, (button) => {
      return (_openBlock(), _createElementBlock("button", {
        key: button.value || button,
        value: button.value || button,
        class: _normalizeClass(["bg-white border-b-2 text-2xl font-bold border-calcbutton-shade rounded", button.css]),
        onClick: $event => (this.click(button.value || button))
      }, _toDisplayString(button.value || button), 11, _hoisted_2))
    }), 128))
  ]))
};

defaultExport.render = render;

export default defaultExport;