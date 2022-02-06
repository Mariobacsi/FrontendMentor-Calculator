
import Calculator from './components/Calculator.vue.js';

const defaultExport = {
  name: "app",
  components: {
    Calculator,
  },
};

import { resolveComponent as _resolveComponent, createVNode as _createVNode, openBlock as _openBlock, createElementBlock as _createElementBlock } from "../_snowpack/pkg/vue.js"

const _hoisted_1 = { class: "mt-8 mb-4" }

export function render(_ctx, _cache) {
  const _component_calculator = _resolveComponent("calculator")

  return (_openBlock(), _createElementBlock("div", _hoisted_1, [
    _createVNode(_component_calculator)
  ]))
};

defaultExport.render = render;

export default defaultExport;