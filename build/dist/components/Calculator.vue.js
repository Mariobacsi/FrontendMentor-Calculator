
import ThemeSelector from "./calculator/ThemeSelector.vue.js";
import Display from "./calculator/Display.vue.js";
import Numpad from "./calculator/Numpad.vue.js";

const defaultExport = {
  name: "calculator",
  components: {
    ThemeSelector,
    Display,
    Numpad,
  },
};

import { createElementVNode as _createElementVNode, resolveComponent as _resolveComponent, createVNode as _createVNode, openBlock as _openBlock, createElementBlock as _createElementBlock } from "../../_snowpack/pkg/vue.js"

const _hoisted_1 = { class: "w-64 md:w-80 mx-auto grid gap-4" }
const _hoisted_2 = { class: "flex flex-row justify-between items-end" }
const _hoisted_3 = /*#__PURE__*/_createElementVNode("p", { class: "text-white align-text-bottom font-bold text-2xl lowercase" }, " calc ", -1)

export function render(_ctx, _cache) {
  const _component_theme_selector = _resolveComponent("theme-selector")
  const _component_display = _resolveComponent("display")
  const _component_numpad = _resolveComponent("numpad")

  return (_openBlock(), _createElementBlock("div", _hoisted_1, [
    _createElementVNode("div", _hoisted_2, [
      _hoisted_3,
      _createVNode(_component_theme_selector)
    ]),
    _createVNode(_component_display, { class: "bg-main-dark" }),
    _createVNode(_component_numpad, { class: "bg-main-base" })
  ]))
};

defaultExport.render = render;

export default defaultExport;