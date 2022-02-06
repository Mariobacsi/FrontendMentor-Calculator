
import { useCalcStore } from "../../stores/CalculatorStore.js";
import { storeToRefs } from "../../../_snowpack/pkg/pinia.js";

const defaultExport = {
  name: "Display",
  setup() {
    const calc = useCalcStore();

    // extract specific store properties
    const { getDisplay, getDisplayHistory } = storeToRefs(calc);

    return {
      getDisplay,
      getDisplayHistory,
    };
  },
};

import { toDisplayString as _toDisplayString, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, createElementVNode as _createElementVNode } from "../../../_snowpack/pkg/vue.js"

const _hoisted_1 = { class: "rounded-md text-white font-bold p-3" }
const _hoisted_2 = { key: 0 }
const _hoisted_3 = { class: "text-right text-xl" }

export function render(_ctx, _cache) {
  return (_openBlock(), _createElementBlock("div", _hoisted_1, [
    (_ctx.getDisplay)
      ? (_openBlock(), _createElementBlock("h3", _hoisted_2, _toDisplayString(_ctx.getDisplayHistory), 1))
      : _createCommentVNode("", true),
    _createElementVNode("h2", _hoisted_3, _toDisplayString(_ctx.getDisplay ? _ctx.getDisplay : _ctx.getDisplayHistory ? _ctx.getDisplayHistory : 0), 1)
  ]))
};

defaultExport.render = render;

export default defaultExport;